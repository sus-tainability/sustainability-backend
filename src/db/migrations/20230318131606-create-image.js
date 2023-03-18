'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'assets',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      requiredTotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('images');
  },
};
