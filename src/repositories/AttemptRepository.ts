import {Sequelize} from 'sequelize/types';

import Attempt from '../models/Attempt';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class AttemptRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Attempt.name] as ModelStatic);
  }
}
