import {Sequelize} from 'sequelize/types';

import Validated from '../models/Validated';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class ValidatedRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Validated.name] as ModelStatic);
  }
}
