import {Model, DataTypes, Optional, Sequelize} from 'sequelize';
import {Models} from '../types';

export interface AttemptAttributes {
  attemptId: number;
  eventId: number;
  userId: number;
  startDate: string;
}

export type AttemptCreationAttributes = Optional<
  AttemptAttributes,
  'attemptId'
>;

class Attempt
  extends Model<AttemptAttributes, AttemptCreationAttributes>
  implements AttemptAttributes
{
  public attemptId!: number; // Note that the `null assertion` `!` is required in strict mode.
  public eventId!: number;
  public userId!: number;
  public startDate!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static tableName = 'attempts';

  //access table name
  public static getTableName = (): string => {
    return Attempt.tableName;
  };

  public static initModel(sequelize: Sequelize) {
    Attempt.init(
      {
        attemptId: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
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
        startDate: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        tableName: Attempt.getTableName()!,
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }

  // Use this method to create foreign key restraints
  public static associate(models: Models) {
    Attempt.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      targetKey: 'id',
      as: 'users',
    });
    Attempt.belongsTo(models.Event, {
      foreignKey: {
        name: 'eventId',
        allowNull: false,
      },
      targetKey: 'id',
      as: 'events',
    });
    Attempt.hasMany(models.Asset, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'attemptId',
        allowNull: false,
      },
      sourceKey: 'attemptId',
      as: 'assets',
    });
  }
}

export default Attempt;
