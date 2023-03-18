'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      attemptId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'attempts',
          key: 'attemptId',
        },
        onDelete: 'CASCADE',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('assets');
  },
};
