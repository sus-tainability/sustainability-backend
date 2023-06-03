'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('events', 'personalContributionHowTo', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('events', 'communityContributionHowTo', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('events', 'personalContributionHowTo'),
      queryInterface.removeColumn('events', 'communityContributionHowTo'),
    ]);
  },
};
