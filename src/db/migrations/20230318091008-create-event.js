'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      carbonSave: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eventDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reward: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      requiredAssets: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('events');
  },
};
