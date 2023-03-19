/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('part_of', [
      {
        eventOneId: 1,
        eventTwoId: 2,
        storyId: 1,
        name: 'Choose Event 1 or 2',
        description: 'This is an Event Choosing Description',
        startDate: '2023-03-18T14:22:51.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventOneId: 3,
        eventTwoId: 4,
        storyId: 1,
        name: 'Choose Event 3 or 4',
        description: 'This is an Event Choosing Description',
        startDate: '2023-03-25T14:22:51.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventOneId: 5,
        eventTwoId: 6,
        storyId: 1,
        name: 'Choose Event 5 or 6',
        description: 'This is an Event Choosing Description',
        startDate: '2023-04-01T14:22:51.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('part_of', null, {});
  },
};
