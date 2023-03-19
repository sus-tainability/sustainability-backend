/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('events', [
      {
        name: 'Event 1',
        description: 'Event 1 description',
        validationText: 'Event 1 validation text',
        carbonSave: 100,
        eventDuration: 5,
        reward: 100,
        requiredAssets: 5,
        imageUrl:
          'https://www.svgrepo.com/download/20675/open-cardboard-box.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Event 2',
        description: 'Event 2 description',
        validationText: 'Event 2 validation text',
        carbonSave: 100,
        eventDuration: 5,
        reward: 100,
        requiredAssets: 5,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/5228/5228562.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Event 3',
        description: 'Event 3 description',
        validationText: 'Event 3 validation text',
        carbonSave: 100,
        eventDuration: 5,
        reward: 100,
        requiredAssets: 5,
        imageUrl:
          'https://www.svgrepo.com/download/20675/open-cardboard-box.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Event 4',
        description: 'Event 4 description',
        validationText: 'Event 4 validation text',
        carbonSave: 100,
        eventDuration: 5,
        reward: 100,
        requiredAssets: 5,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/5228/5228562.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Event 5',
        description: 'Event 5 description',
        validationText: 'Event 5 validation text',
        carbonSave: 100,
        eventDuration: 5,
        reward: 100,
        requiredAssets: 5,
        imageUrl:
          'https://www.svgrepo.com/download/20675/open-cardboard-box.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Event 6',
        description: 'Event 6 description',
        validationText: 'Event 6 validation text',
        carbonSave: 100,
        eventDuration: 5,
        reward: 100,
        requiredAssets: 5,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/5228/5228562.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('events', null, {});
  },
};
