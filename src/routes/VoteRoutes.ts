import express, {Request, Response, NextFunction} from 'express';

import VoteController from '../controllers/VoteController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';

export default () => {
  const voteRouter = express.Router();
  const voteController: VoteController =
    Container.getInstance().get('VoteController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  voteRouter.post(
    '/new',
    [auth],
    voteController.createNewVote.bind(voteController)
  );

  return voteRouter;
};
