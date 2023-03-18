/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('attempts', [
      {
        userId: 1,
        eventId: 1,
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
