/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('part_of', [
      {
        eventOneId: 1,
        eventTwoId: 1,
        storyId: 1,
        name: 'Welcome to the Adventure!',
        description: 'Join us in raising awareness for red pandas',
        startDate: '2023-03-18T14:22:51.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventOneId: 2,
        eventTwoId: 3,
        storyId: 1,
        name: 'Less Paper,\nMore Trees',
        description:
          "Deforestation is the major threat to the red pandas' population. Even when forests are only partially cut down, deforestation can still lead to massive population losses for red pandas.",
        startDate: '2023-03-25T14:22:51.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventOneId: 4,
        eventTwoId: 5,
        storyId: 1,
        name: 'Small Change,\nBig Impact',
        description:
          'The survival of red pandas is inextricably linked to the health of our planet. Climate change, caused by excessive carbon emissions, is a major threat to their survival.',
        startDate: '2023-04-01T14:22:51.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventOneId: 6,
        eventTwoId: 7,
        storyId: 1,
        name: 'Appliance Labels Matter',
        description:
          'Another way to reduce our carbon footprint is by conserving energy. By taking small steps to conserve energy, we can help reduce greenhouse gas emissions and slow the effects of climate change.',
        startDate: '2023-04-06T14:22:51.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventOneId: 8,
        eventTwoId: 9,
        storyId: 1,
        name: 'Save My Home',
        description:
          "Don't let the red pandas disappear forever! Their populations are declining rapidly due to habitat loss and poaching, but you can make a difference by donating to a conservation organization that works to protect these incredible creatures.",
        startDate: '2023-04-11T14:22:51.000Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('part_of', null, {});
  },
};
