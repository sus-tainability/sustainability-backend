import {Model, DataTypes, Optional, Sequelize} from 'sequelize';
import {Models} from '../types';

export interface RejectedAttributes {
  id: number;
  imageId: number;
  userId: number;
}

export type RejectedCreationAttributes = Optional<RejectedAttributes, 'id'>;

class Rejected
  extends Model<RejectedAttributes, RejectedCreationAttributes>
  implements RejectedAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public imageId!: number;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static tableName = 'rejections';

  //access table name
  public static getTableName = (): string => {
    return Rejected.tableName;
  };

  public static initModel(sequelize: Sequelize) {
    Rejected.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        imageId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        tableName: Rejected.getTableName()!,
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }

  // Use this method to create foreign key restraints
  public static associate(models: Models) {
    Rejected.belongsTo(models.Image, {
      foreignKey: 'imageId',
      as: 'image',
    });
    Rejected.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export default Rejected;
