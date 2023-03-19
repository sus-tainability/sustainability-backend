import express, {Request, Response, NextFunction} from 'express';

import AttemptController from '../controllers/AttemptController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';

export default () => {
  const attemptRouter = express.Router();
  const attemptController: AttemptController =
    Container.getInstance().get('AttemptController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  attemptRouter.post(
    '/new',
    [auth],
    attemptController.createNewAttempt.bind(attemptController)
  );

  return attemptRouter;
};
