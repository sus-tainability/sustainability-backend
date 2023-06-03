'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('part_of', 'voteImgUrl', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue:
          'https://storage.googleapis.com/image-assets-sus-tainability/voteImg.png',
      }),
    ]);
  },

  down(queryInterface) {
    // logic for reverting the changes
    return Promise.all([queryInterface.removeColumn('part_of', 'voteImgUrl')]);
  },
};
