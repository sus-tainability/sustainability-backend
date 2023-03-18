import {Model, DataTypes, Sequelize} from 'sequelize';
import {Models} from '../types';

export interface VoteAttributes {
  eventId: number;
  userId: number;
}

export type VoteCreationAttributes = VoteAttributes;

class Vote
  extends Model<VoteAttributes, VoteCreationAttributes>
  implements VoteAttributes
{
  public eventId!: number;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static tableName = 'votes';

  //access table name
  public static getTableName = (): string => {
    return Vote.tableName;
  };

  public static initModel(sequelize: Sequelize) {
    Vote.init(
      {
        eventId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        tableName: Vote.getTableName()!,
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }

  // Use this method to create foreign key restraints
  public static associate(models: Models) {
    Vote.belongsTo(models.Event, {
      foreignKey: 'eventId',
      targetKey: 'id',
    });
    Vote.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  }
}

export default Vote;
