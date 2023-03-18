import express, {Request, Response, NextFunction} from 'express';

import UserController from '../controllers/UserController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';

export default () => {
  const userRouter = express.Router();
  const userController: UserController =
    Container.getInstance().get('UserController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  userRouter.get(
    '/getSelf',
    [auth],
    userController.getSelf.bind(userController)
  );

  return userRouter;
};
