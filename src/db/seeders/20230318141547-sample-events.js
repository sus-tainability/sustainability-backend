/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('events', [
      {
        name: 'Raise Awareness!',
        description: 'Join us in raising awareness for red pandas by creating a social media post with the hashtags #savingredpandas and #BetterEarth. Let\'s use the power of social media to help protect these amazing animals!',
        validationText: 'Verify if this is a social post',
        carbonSave: 50, //TODO- Will update this with new data
        eventDuration: 5, 
        reward: 300,
        requiredAssets: 3,
        imageUrl:
          null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cardboard / Cartons',
        description: 'By recycling cardboard and cartons, you can reduce your impact on the environment and help protect the forests that red pandas call home.',
        validationText: 'Verify if this is a cardboard or carton',
        carbonSave: 300, //TODO- Will update this with new data
        eventDuration: 3,
        reward: 400,
        requiredAssets: 3, 
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/685/685388.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'E-Statements',
        description: 'By opting in for e-statements, you can reduce your paper usage and help protect the forests that red pandas call home.',
        validationText: 'Verify if this is a e-statement switch',
        carbonSave: 100,  //TODO- Will update this with new data
        eventDuration: 3,
        reward: 400,
        requiredAssets: 3,
        imageUrl:
          'https://cdn-icons-png.flaticon.com/512/2377/2377960.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eat Vegetarian',
        description: 'By consuming vegetarian meals, even if it\'s just one day a week, we can help reduce the emission of greenhouse gases and lessen the impact of climate change on the planet.',
        validationText: 'Verify if this is a vegetarian meal',
        carbonSave: 500, //TODO- Will update this with new data
        eventDuration: 5,
        reward: 500,
        requiredAssets: 5,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2918/2918148.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Recyclable bags',
        description: 'Bringing a recyclable bag with you wherever you go is a simple yet effective way to help the planet and support the survival of these incredible animals.',
        validationText: 'Verify if this is a recycleable bag',
        carbonSave: 500, //TODO- Will update this with new data
        eventDuration: 5,
        reward: 500,
        requiredAssets: 5,
        imageUrl:
          'https://cdn-icons-png.flaticon.com/512/2784/2784495.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Water Efficiency Label',
        description: 'Appliances with higher water efficiency ratings use less water and can help us conserve this precious resource.',
        validationText: 'Verify if this is a water efficiency label',
        carbonSave: 700, //TODO- Will update this with new data
        eventDuration: 5,
        reward: 700,
        requiredAssets: 3,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/427/427112.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Energy Efficiency Label',
        description: 'Appliances with higher energy efficiency ratings use less energy and can help us conserve this precious resource.',
        validationText: 'Verify if this is a energy efficiency label',
        carbonSave: 700, //TODO- Will update this with new data
        eventDuration: 5,
        reward: 700,
        requiredAssets: 3,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2731/2731636.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Donate: WWF',
        description: 'Donate to the World Wide Fund for Nature.',
        carbonSave: 100, //TODO- Will update this with new data
        eventDuration: 7,
        reward: 1000,
        requiredAssets: 1,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/3349/3349507.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Donate: Red Panda Network',
        description: 'Donate to the Red Panda Network',
        validationText: 'Verify if this is a donation receipt to Red Panda Network',
        carbonSave: 100, //TODO- Will update this with new data
        eventDuration: 7,
        reward: 1000,
        requiredAssets: 1,
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/3349/3349507.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('events', null, {});
  },
};
