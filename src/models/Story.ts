import {Model, DataTypes, Optional, Sequelize} from 'sequelize';
// import {Models} from '../types';

export interface StoryAttributes {
  id: number;
  name: string;
  description: string;
}

export type StoryCreationAttributes = Optional<StoryAttributes, 'id'>;

class Story
  extends Model<StoryAttributes, StoryCreationAttributes>
  implements StoryAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public description!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static tableName = 'stories';

  //access table name
  public static getTableName = (): string => {
    return Story.tableName;
  };

  public static initModel(sequelize: Sequelize) {
    Story.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        description: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
      },
      {
        tableName: Story.getTableName()!,
        sequelize, // passing the `sequelize` instance is required
      }
    );
  }

  // Use this method to create foreign key restraints
  // public static associate(models: Models) {}
}

export default Story;
