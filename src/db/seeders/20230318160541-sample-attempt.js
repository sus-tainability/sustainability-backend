/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('attempts', [
      {
        userId: 2,
        eventId: 2,
        startDate: '2021-03-18T16:05:41.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        eventId: 3,
        startDate: '2021-03-18T16:05:41.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        eventId: 4,
        startDate: '2021-03-18T16:05:41.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        eventId: 5,
        startDate: '2021-03-18T16:05:41.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        eventId: 6,
        startDate: '2021-03-18T16:05:41.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        eventId: 7,
        startDate: '2021-03-18T16:05:41.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('attempts', null, {});
  },
};
