/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('assets', [
      {
        attemptId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attemptId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attemptId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attemptId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attemptId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        attemptId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('assets', null, {});
  },
};
