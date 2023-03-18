import {Model, DataTypes, Sequelize} from 'sequelize';
// import {Models} from '../types';

export interface PartOfAttributes {
  eventOneId: number;
  eventTwoId: number;
  storyId: number;
  name: string;
  description: string;
  startDate: string;
}

export type PartOfCreationAttributes = PartOfAttributes;

class PartOf
  extends Model<PartOfAttributes, PartOfCreationAttributes>
  implements PartOfAttributes
{
  public eventOneId!: number;
  public eventTwoId!: number;
  public storyId!: number;
  public name!: string;
  public description!: string;
  public startDate!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static tableName = 'part_of';

  //access table name
  public static getTableName = (): string => {
    return PartOf.tableName;
  };

  public static initModel(sequelize: Sequelize) {
    PartOf.init(
      {
        eventOneId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        eventTwoId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
        },
        storyId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
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
        startDate: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        tableName: PartOf.getTableName()!,
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }

  // Use this method to create foreign key restraints
  // public static associate(models: Models) {}
}

export default PartOf;
