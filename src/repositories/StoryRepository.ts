import {Sequelize} from 'sequelize/types';
import models from '../models';

import Story from '../models/Story';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export default class StoryRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Story.name] as ModelStatic);
  }

  async getStoryAndEvents(storyId: number) {
    const story = await this.model.findOne({
      where: {id: storyId},
      include: {
        model: models.PartOf,
        as: 'partOf',
        include: [
          {
            model: models.Event,
            as: 'eventOne',
          },
          {
            model: models.Event,
            as: 'eventTwo',
          },
        ],
      },
    });

    return story ? story.get({plain: true}) : null;
  }
}
