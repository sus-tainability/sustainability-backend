'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('part_of', {
      eventOneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'events',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      eventTwoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'events',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      storyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('part_of');
  },
};
