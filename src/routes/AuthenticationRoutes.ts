import express from 'express';

import AuthenticationController from '../controllers/AuthenticationController';
import Container from '../utils/container';

export default () => {
  const authenticationRouter = express.Router();
  const authenticationController: AuthenticationController =
    Container.getInstance().get('AuthenticationController');

  authenticationRouter.post(
    '/signin',
    authenticationController.signIn.bind(authenticationController)
  );

  authenticationRouter.post(
    '/login/oauth2/google',
    authenticationController.googleAuth.bind(authenticationController)
  );

  return authenticationRouter;
};
