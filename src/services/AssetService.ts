import Image, {ImageCreationAttributes} from '../models/Image';
import Asset, {AssetCreationAttributes} from '../models/Asset';

import AssetRepository from '../repositories/AssetRepository';
import ImageRepository from '../repositories/ImageRepository';
import EventRepository, {
  AssetsAndImages,
} from '../repositories/EventRepository';
import RejectedRepository from '../repositories/RejectedRepository';
import ValidatedRepository from '../repositories/ValidatedRepository';

import sequelize from '../db';
import {Model} from 'sequelize';

export default class AssetService {
  private assetRepository: AssetRepository;
  private imageRepository: ImageRepository;
  private eventRepository: EventRepository;
  private rejectedRepository: RejectedRepository;
  private validatedRepository: ValidatedRepository;

  constructor(
    assetRepository: AssetRepository,
    imageRepository: ImageRepository,
    eventRepository: EventRepository,
    rejectedRepository: RejectedRepository,
    validatedRepository: ValidatedRepository
  ) {
    this.assetRepository = assetRepository;
    this.imageRepository = imageRepository;
    this.eventRepository = eventRepository;
    this.rejectedRepository = rejectedRepository;
    this.validatedRepository = validatedRepository;
  }

  async validateImageAsset(imageId: number, userId: number) {
    return await this.validatedRepository.createOne({imageId, userId});
  }

  async rejectImageAsset(imageId: number, userId: number) {
    return await this.rejectedRepository.createOne({imageId, userId});
  }

  async getAllAssetAndImages() {
    const allAssetsAndImages =
      (await this.eventRepository.getAllAssetAndImages()) as Model<AssetsAndImages>[];
    return allAssetsAndImages.map(assetAndImage =>
      assetAndImage.get({plain: true})
    );
  }

  async createNewImageAsset(
    asset: AssetCreationAttributes,
    image: ImageCreationAttributes
  ) {
    await sequelize.transaction(async t => {
      const newAsset = (await this.assetRepository.createOne(asset, {
        transaction: t,
      })) as Asset;
      const newImage = (await this.imageRepository.createOne(
        {
          ...image,
          id: newAsset.id,
        },
        {
          transaction: t,
        }
      )) as Image;
      return {newAsset, newImage};
    });
  }
}
