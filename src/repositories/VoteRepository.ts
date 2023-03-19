import {Sequelize} from 'sequelize/types';

import Vote from '../models/Vote';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class VoteRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Vote.name] as ModelStatic);
  }
}
