import {Sequelize} from 'sequelize/types';
import models from '../models';

import PartOf from '../models/PartOf';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export type PartOfWithEvents = {
  id: number;
  eventOneId: number;
  eventTwoId: number;
  storyId: number;
  name: string;
  description: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  eventOne: {
    id: number;
    name: string;
    description: string;
    carbonSave: number;
    eventDuration: number;
    reward: number;
    requiredAssets: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    votes: {
      id: number;
      eventId: number;
      userId: number;
    }[];
  };
  eventTwo: {
    id: number;
    name: string;
    description: string;
    carbonSave: number;
    eventDuration: number;
    reward: number;
    requiredAssets: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    votes: {
      id: number;
      eventId: number;
      userId: number;
    }[];
  };
};

export default class PartOfRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[PartOf.name] as ModelStatic);
  }

  async getAllEventByPartOf(storyId: number) {
    const partOfEvents = this.model.findAll({
      where: {storyId},
      include: [
        {
          model: models.Event,
          as: 'eventOne',
          include: [
            {
              model: models.Vote,
              as: 'votes',
            },
          ],
        },
        {
          model: models.Event,
          as: 'eventTwo',
          include: [
            {
              model: models.Vote,
              as: 'votes',
            },
          ],
        },
      ],
    });
    return (await partOfEvents).map(partof =>
      partof.get({plain: true})
    ) as PartOfWithEvents[];
  }
}
