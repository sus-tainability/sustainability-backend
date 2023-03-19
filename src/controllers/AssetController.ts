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
