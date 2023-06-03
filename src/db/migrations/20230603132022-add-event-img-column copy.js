'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('events', 'challegeImgUrl', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:
          'https://storage.googleapis.com/image-assets-sus-tainability/gameImg.png',
      }),
    ]);
  },

  down(queryInterface) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('events', 'challegeImgUrl'),
    ]);
  },
};
