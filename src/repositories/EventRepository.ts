import {Sequelize} from 'sequelize/types';
import models from '../models';

import Event from '../models/Event';
import {ModelStatic} from '../types';
import BaseRepository from './BaseRepository';

export type AssetsAndImages = {
  id: number;
  name: string;
  description: string;
  validationText: string;
  carbonSave: number;
  eventDuration: number;
  reward: number;
  requiredAssets: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  attempts: {
    attemptId: number;
    eventId: number;
    userId: number;
    startDate: Date;
    createdAt: Date;
    updatedAt: Date;
    assets: {
      id: number;
      attemptId: number;
      createdAt: Date;
      updatedAt: Date;
      images: {
        id: number;
        requiredTotal: number;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
        validated: {
          id: number;
          imageId: number;
          userId: number;
          createdAt: Date;
          updatedAt: Date;
        }[];
        rejected: {
          id: number;
          imageId: number;
          userId: number;
          createdAt: Date;
          updatedAt: Date;
        }[];
      };
    }[];
  }[];
};

export type FullEvent =
  | {
      id: number;
      name: string;
      description: string;
      validationText: string;
      carbonSave: number;
      eventDuration: number;
      reward: number;
      requiredAssets: number;
      imageUrl: string;
      createdAt: Date;
      updatedAt: Date;
      attempts: {
        attemptId: number;
        eventId: number;
        userId: number;
        startDate: Date;
        createdAt: Date;
        updatedAt: Date;
        assets: {
          id: number;
          attemptId: number;
          createdAt: Date;
          updatedAt: Date;
          images: {
            id: number;
            requiredTotal: number;
            imageUrl: string;
            createdAt: Date;
            updatedAt: Date;
            validated: {
              id: number;
              imageId: number;
              userId: number;
              createdAt: Date;
              updatedAt: Date;
            }[];
            rejected: {
              id: number;
              imageId: number;
              userId: number;
              createdAt: Date;
              updatedAt: Date;
            }[];
          };
        }[];
      }[];
    }
  | undefined;

export default class EventRepository extends BaseRepository {
  constructor(db: Sequelize) {
    super(db.models[Event.name] as ModelStatic);
  }

  async getAllAssetAndImages() {
    return this.model.findAll({
      include: [
        {
          model: models.Attempt,
          as: 'attempts',
          include: [
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

  async getEventWithAttempt(eventId: number, userId: number) {
    return this.model.findAll({
      where: {id: eventId},
      include: {
        model: models.Attempt,
        as: 'attempts',
        where: {userId},
        include: [
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
    });
  }
}
