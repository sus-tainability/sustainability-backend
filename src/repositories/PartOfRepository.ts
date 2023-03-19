import {Sequelize} from 'sequelize/types';
import models from '../models';

import PartOf from '../models/PartOf';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

// {
//   "eventOneId": 1,
//   "eventTwoId": 2,
//   "storyId": 1,
//   "name": "Choose Event 1 or 2",
//   "description": "This is an Event Choosing Description",
//   "startDate": "2021-03-18T14:22:51.000Z",
//   "createdAt": "2023-03-18T18:11:57.336Z",
//   "updatedAt": "2023-03-18T18:11:57.336Z",
//   "eventOne": {
//       "id": 1,
//       "name": "Event 1",
//       "description": "Event 1 description",
//       "carbonSave": 100,
//       "eventDuration": 5,
//       "reward": 100,
//       "requiredAssets": 5,
//       "imageUrl": "https://www.svgrepo.com/download/20675/open-cardboard-box.svg",
//       "createdAt": "2023-03-18T18:11:57.327Z",
//       "updatedAt": "2023-03-18T18:11:57.327Z"
//   },
//   "eventTwo": {
//       "id": 2,
//       "name": "Event 2",
//       "description": "Event 2 description",
//       "carbonSave": 100,
//       "eventDuration": 5,
//       "reward": 100,
//       "requiredAssets": 5,
//       "imageUrl": "https://cdn-icons-png.flaticon.com/512/5228/5228562.png",
//       "createdAt": "2023-03-18T18:11:57.327Z",
//       "updatedAt": "2023-03-18T18:11:57.327Z"
//   }
// },

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
        },
        {
          model: models.Event,
          as: 'eventTwo',
        },
      ],
    });
    return (await partOfEvents).map(partof =>
      partof.get({plain: true})
    ) as PartOfWithEvents[];
  }
}
