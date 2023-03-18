import {Model, DataTypes, Optional, Sequelize} from 'sequelize';
import {Models} from '../types';

export interface EventAttributes {
  id: number;
  name: string;
  description: string;
  carbonSave: number;
  eventDuration: number;
  reward: number;
  requiredAssets: number;
  imageUrl: string;
}

export type EventCreationAttributes = Optional<EventAttributes, 'id'>;

class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public description!: string;
  public carbonSave!: number;
  public eventDuration!: number;
  public reward!: number;
  public requiredAssets!: number;
  public imageUrl!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static tableName = 'events';

  //access table name
  public static getTableName = (): string => {
    return Event.tableName;
  };

  public static initModel(sequelize: Sequelize) {
    Event.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        description: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        carbonSave: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        eventDuration: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        reward: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        requiredAssets: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        imageUrl: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        tableName: Event.getTableName()!,
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }

  // Use this method to create foreign key restraints
  public static associate(models: Models) {
    Event.hasMany(models.Attempt, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'eventId',
        allowNull: false,
      },
      as: 'attempts',
    });
    Event.hasMany(models.Vote, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'eventId',
        allowNull: false,
      },
      as: 'votes',
    });
    Event.hasMany(models.PartOf, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'eventOneId',
        allowNull: false,
      },
    });
    Event.hasMany(models.PartOf, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'eventTwoId',
        allowNull: false,
      },
    });
  }
}

export default Event;
