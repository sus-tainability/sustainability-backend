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

import StoryRepsitory from './repositories/StoryRepository';
import StoryService from './services/StoryService';
import StoryController from './controllers/StoryController';
import StoryRouter from './routes/StoryRoutes';

import AttemptRouter from './routes/AttemptRoutes';
import AttemptController from './controllers/AttemptController';
import AttemptRepository from './repositories/AttemptRepository';
import AttemptService from './services/AttemptService';

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
    this.app.use('/story', StoryRouter());
    this.app.use('/attempt', AttemptRouter());
  }

  public async initContainer() {
    const container = Container.getInstance();
    container.register('db', sequelize, []);

    // Repositories
    container.register('UserRepository', UserRepository, ['db']);
    container.register('EventRepository', EventRepository, ['db']);
    container.register('PartOfRepository', PartOfRepository, ['db']);
    container.register('StoryRepository', StoryRepsitory, ['db']);
    container.register('AttemptRepository', AttemptRepository, ['db']);

    // Services
    container.register('UserService', UserService, ['UserRepository']);
    container.register('EventService', EventService, [
      'EventRepository',
      'PartOfRepository',
    ]);
    container.register('StoryService', StoryService, ['StoryRepository']);
    container.register('AttemptService', AttemptService, ['AttemptRepository']);

    // Controllers
    container.register('UserController', UserController, ['UserService']);
    container.register('AuthenticationController', AuthenticationController, [
      'UserService',
    ]);
    container.register('EventController', EventController, ['EventService']);
    container.register('StoryController', StoryController, ['StoryService']);
    container.register('AttemptController', AttemptController, [
      'AttemptService',
    ]);

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
