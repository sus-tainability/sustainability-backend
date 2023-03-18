'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attempts', {
      attemptId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'events',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      startDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('attempts');
  },
};
