import express, {Request, Response, NextFunction} from 'express';

import EventController from '../controllers/EventController';
import Container from '../utils/container';
import AuthenticationMiddleware from '../middlewares/authentication';

export default () => {
  const eventRouter = express.Router();
  const eventController: EventController =
    Container.getInstance().get('EventController');
  const authenticationMiddleware: AuthenticationMiddleware =
    Container.getInstance().get('AuthenticationMiddleware');

  const auth = (req: Request, res: Response, next: NextFunction) =>
    authenticationMiddleware.authentication(req, res, next);

  eventRouter.get(
    '/:id',
    [auth],
    eventController.getEventWithAttempt.bind(eventController)
  );

  return eventRouter;
};
