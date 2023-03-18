import {Model, DataTypes, Optional, Sequelize} from 'sequelize';
// import {Models} from '../types';

export interface VoteAttributes {
  id: number;
  eventId: number;
  userId: number;
}

export type VoteCreationAttributes = Optional<VoteAttributes, 'id'>;

class Vote
  extends Model<VoteAttributes, VoteCreationAttributes>
  implements VoteAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
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
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        eventId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        tableName: Vote.getTableName()!,
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }

  // Use this method to create foreign key restraints
  // public static associate(models: Models) {}
}

export default Vote;
