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
        attemptId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('assets', null, {});
  },
};
