import express, {Request, Response, NextFunction} from 'express';

import AssetController from '../controllers/AssetController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';
import fileupload from '../middlewares/fileupload';

export default () => {
  const assetRouter = express.Router();
  const assetController: AssetController =
    Container.getInstance().get('AssetController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  assetRouter.post(
    '/images/validate',
    [auth],
    assetController.validateImageAsset.bind(assetController)
  );

  assetRouter.post(
    '/images/reject',
    [auth],
    assetController.rejectImageAsset.bind(assetController)
  );

  assetRouter.post(
    '/images/new',
    [auth, fileupload],
    assetController.createNewImageAsset.bind(assetController)
  );

  assetRouter.get(
    '/images/pending',
    [auth],
    assetController.getPendingAssets.bind(assetController)
  );

  return assetRouter;
};
