import {Model, DataTypes, Optional, Sequelize} from 'sequelize';
// import {Models} from '../types';

export interface ImageAttributes {
  id: number;
  requiredTotal: number;
  imageUrl: string;
}

export type ImageCreationAttributes = Optional<ImageAttributes, 'id'>;

class Image
  extends Model<ImageAttributes, ImageCreationAttributes>
  implements ImageAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public requiredTotal!: number;
  public imageUrl!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static tableName = 'images';

  //access table name
  public static getTableName = (): string => {
    return Image.tableName;
  };

  public static initModel(sequelize: Sequelize) {
    Image.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        requiredTotal: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        imageUrl: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        tableName: Image.getTableName()!,
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }

  // Use this method to create foreign key restraints
  // public static associate(models: Models) {}
}

export default Image;
