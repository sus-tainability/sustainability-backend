import {Sequelize} from 'sequelize/types';

import Rejected from '../models/Rejected';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class RejectedRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Rejected.name] as ModelStatic);
  }
}
