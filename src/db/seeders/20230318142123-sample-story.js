/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('stories', [
      {
        name: 'The Fluffiest Endangered Species',
        description:
          'Red pandas are one of the most adorable and unique animals in the world, but they are also in danger of disappearing forever due to habitat loss and poaching.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('stories', null, {});
  },
};
