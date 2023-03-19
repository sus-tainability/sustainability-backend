import Image, {ImageCreationAttributes} from '../models/Image';
import Asset, {AssetCreationAttributes} from '../models/Asset';

import AssetRepository from '../repositories/AssetRepository';
import ImageRepository from '../repositories/ImageRepository';
import sequelize from '../db';

export default class AssetService {
  private assetRepository: AssetRepository;
  private imageRepository: ImageRepository;

  constructor(
    assetRepository: AssetRepository,
    imageRepository: ImageRepository
  ) {
    this.assetRepository = assetRepository;
    this.imageRepository = imageRepository;
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
