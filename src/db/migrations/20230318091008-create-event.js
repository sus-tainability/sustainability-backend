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
      validationText: {
        type: Sequelize.STRING,
        allowNull: true,
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
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
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
