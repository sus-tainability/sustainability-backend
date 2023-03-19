import express, {Request, Response, NextFunction} from 'express';

import StoryController from '../controllers/StoryController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';

export default () => {
  const storyRouter = express.Router();
  const storyController: StoryController =
    Container.getInstance().get('StoryController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  storyRouter.get(
    '/current',
    [auth],
    storyController.getStoryandEvents.bind(storyController)
  );

  return storyRouter;
};
