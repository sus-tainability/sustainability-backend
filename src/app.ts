import express, {Application} from 'express';

import UserController from './controllers/UserController';
import UserRepository from './repositories/UserRepository';
import UserRouter from './routes/UserRoutes';
import UserService from './services/UserService';

import EventController from './controllers/EventController';
import EventRepository from './repositories/EventRepository';
import EventRouter from './routes/EventRoutes';
import EventService from './services/EventService';

import PartOfRepository from './repositories/PartOfRepository';

import AuthenticationController from './controllers/AuthenticationController';
import AuthenticationRoutes from './routes/AuthenticationRoutes';
import AuthenticationMiddleware from './middlewares/authentication';

import sequelize from './db';
import models from './models';

import Container from './utils/container';

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
  }

  public initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
      );
      next();
    });
  }

  public initModels() {
    Object.keys(models).forEach(key => {
      models[key].initModel(Container.getInstance().get('db'));
    });

    Object.keys(models).forEach(key => {
      if ('associate' in models[key]) {
        models[key].associate(models);
      }
    });
  }

  public initControllers() {
    this.app.use('/', AuthenticationRoutes());
    this.app.use('/users', UserRouter());
    this.app.use('/events', EventRouter());
  }

  public async initContainer() {
    const container = Container.getInstance();
    container.register('db', sequelize, []);

    // Repositories
    container.register('UserRepository', UserRepository, ['db']);
    container.register('EventRepository', EventRepository, ['db']);
    container.register('PartOfRepository', PartOfRepository, ['db']);

    // Services
    container.register('UserService', UserService, ['UserRepository']);
    container.register('EventService', EventService, [
      'EventRepository',
      'PartOfRepository',
    ]);

    // Controllers
    container.register('UserController', UserController, ['UserService']);
    container.register('AuthenticationController', AuthenticationController, [
      'UserService',
    ]);
    container.register('EventController', EventController, ['EventService']);

    // Middlewares
    container.register('AuthenticationMiddleware', AuthenticationMiddleware, [
      'UserService',
    ]);
  }

  public listen(port: string) {
    this.app.listen(port, () => {
      console.log(`⚡️[server]: Server is running on port ${port}`);
    });
  }
}
