import {Sequelize} from 'sequelize/types';

import Image from '../models/Image';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class ImageRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Image.name] as ModelStatic);
  }
}
