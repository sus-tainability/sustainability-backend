import {NextFunction, Request, Response} from 'express';
import userFriendlyMessage from '../consts/userFriendlyMessages';
import AssetService from '../services/AssetService';
import {AssetCreationAttributes} from '../models/Asset';
import {ImageCreationAttributes} from '../models/Image';

export default class AssetController {
  private assetService: AssetService;

  constructor(assetService: AssetService) {
    this.assetService = assetService;
  }

  async createNewImageAsset(req: Request, res: Response, next: NextFunction) {
    try {
      const {user} = req;
      const {eventId} = req.body;

      const newAsset = 'new asset';

      res.status(200);
      res.json({
        message: userFriendlyMessage.success.createOneAsset,
        data: newAsset,
      });
    } catch (err) {
      res.status(400);
      res.json({message: userFriendlyMessage.failure.createOneAsset});
      next(err);
    }
  }
}
