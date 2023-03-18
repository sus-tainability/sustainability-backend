'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('votes', {
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
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('votes');
  },
};
