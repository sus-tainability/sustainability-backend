import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import AssetService from '../services/AssetService';
import {AssetCreationAttributes} from '../models/Asset';
import {ImageCreationAttributes} from '../models/Image';
import {Storage} from '@google-cloud/storage';
import environment from '../consts/environment';

const projectId = environment.googleProjectId;
const keyFilename = 'sus-tainability-c3d172025534.json';
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket(environment.googleBucketName);

export default class AssetController {
  private assetService: AssetService;

  constructor(assetService: AssetService) {
    this.assetService = assetService;
  }

  async getPendingAssets(req: Request, res: Response, next: NextFunction) {
    try {
      type OutputData = {
        eventId: number;
        name: string;
        description: string;
        validationText: string;
        images: {
          id: number;
          imageUrl: string;
          status: string;
        }[];
      };

      const assets = await this.assetService.getAllAssetAndImages();

      const outputData: OutputData[] = assets.map(event => {
        const {id, name, description, validationText} = event;
        const images = event.attempts.flatMap(attempt => {
          const assetImages = attempt.assets.map(asset => {
            const {id, imageUrl} = asset.images;
            const status =
              asset.images.validated.length + asset.images.rejected.length <
              asset.images.requiredTotal
                ? 'pending'
                : 'completed';
            return {id, imageUrl, status};
          });

          return assetImages.filter(imgs => imgs.status === 'pending');
        });
        return {eventId: id, name, description, validationText, images};
      });

      res.status(200);
      res.json({
        message: userFriendlyMessage.success.getAllAssets,
        data: outputData,
      });
    } catch (err) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.getAllAssets});
      next(err);
    }
  }

  async createNewImageAsset(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.fileNotFound});
      return;
    }

    try {
      const {attemptId} = req.body;

      const file = req.file;

      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream();

      blobStream.on('finish', () => {
        try {
          const fileName = `https://storage.googleapis.com/${environment.googleBucketName}/${file.originalname}`;
          const image: ImageCreationAttributes = {
            imageUrl: fileName,
            requiredTotal: 1,
          };
          const asset: AssetCreationAttributes = {
            attemptId: attemptId,
          };
          this.assetService.createNewImageAsset(asset, image);
          res.status(200);
          res.json({
            message: userFriendlyMessage.success.createOneAsset,
            data: {
              imageUrl: fileName,
            },
          });
        } catch (err) {
          res.status(400);
          res.json({message: userFriendlyMessage.failure.createOneAsset});
          next(err);
        }
      });

      blobStream.end(file.buffer);
    } catch (err) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.createOneAsset});
      next(err);
    }
  }
}
