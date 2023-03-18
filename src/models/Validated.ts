import {Model, DataTypes, Optional, Sequelize} from 'sequelize';
import {Models} from '../types';

export interface ValidatedAttributes {
  id: number;
  imageId: number;
  userId: number;
}

export type ValidatedCreationAttributes = Optional<ValidatedAttributes, 'id'>;

class Validated
  extends Model<ValidatedAttributes, ValidatedCreationAttributes>
  implements ValidatedAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public imageId!: number;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static tableName = 'validations';

  //access table name
  public static getTableName = (): string => {
    return Validated.tableName;
  };

  public static initModel(sequelize: Sequelize) {
    Validated.init(
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
        tableName: Validated.getTableName()!,
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }

  // Use this method to create foreign key restraints
  public static associate(models: Models) {
    Validated.belongsTo(models.Image, {
      foreignKey: 'imageId',
      as: 'image',
    });
    Validated.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export default Validated;
