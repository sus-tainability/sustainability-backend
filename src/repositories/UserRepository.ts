import {Sequelize} from 'sequelize/types';
import models from '../models';

import User from '../models/User';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class UserRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[User.name] as ModelStatic);
  }

  async getFullUserDetails(id: number) {
    return await this.model.findAll({
      where: {id},
      include: [
        {
          model: models.Attempt,
          as: 'attempts',
          include: [
            {
              model: models.Event,
              as: 'events',
            },
            {
              model: models.Asset,
              as: 'assets',
              include: [
                {
                  model: models.Image,
                  as: 'images',
                  include: [
                    {
                      model: models.Validated,
                      as: 'validated',
                    },
                    {
                      model: models.Rejected,
                      as: 'rejected',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  }
}
