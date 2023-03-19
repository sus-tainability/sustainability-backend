import {Sequelize} from 'sequelize/types';

import Asset from '../models/Asset';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class AssetRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Asset.name] as ModelStatic);
  }
}
