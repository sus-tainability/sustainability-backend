import {Model, DataTypes, Optional, Sequelize} from 'sequelize';
import {Models} from '../types';

export interface AssetAttributes {
  id: number;
  attemptId: number;
}

export type AssetCreationAttributes = Optional<AssetAttributes, 'id'>;

class Asset
  extends Model<AssetAttributes, AssetCreationAttributes>
  implements AssetAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public attemptId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static tableName = 'assets';

  //access table name
  public static getTableName = (): string => {
    return Asset.tableName;
  };

  public static initModel(sequelize: Sequelize) {
    Asset.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        attemptId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        tableName: Asset.getTableName()!,
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }

  // Use this method to create foreign key restraints
  public static associate(models: Models) {
    Asset.belongsTo(models.Attempt, {
      foreignKey: {
        name: 'attemptId',
        allowNull: false,
      },
      targetKey: 'attemptId',
      as: 'attempts',
    });
    Asset.hasOne(models.Image, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'id',
        allowNull: false,
      },
      sourceKey: 'id',
      as: 'images',
    });
  }
}

export default Asset;
