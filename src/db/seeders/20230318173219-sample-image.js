/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert('images', [
      {
        id: 1,
        requiredTotal: 500,
        imageUrl:
          'https://media.karousell.com/media/photos/products/2021/7/26/used_cardboard_boxes_1627263318_ecda7c30.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        requiredTotal: 500,
        imageUrl:
          'https://av.sc.com/cn/en/content/images/cn-view-statement-01-en.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        requiredTotal: 500,
        imageUrl:
          'https://realfood.tesco.com/media/images/RFO-1400x919-Pasta-mini-mini-b876d7d9-32d3-4568-8803-1dfe995043d4-0-1400x919.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        requiredTotal: 500,
        imageUrl:
          'https://www.retailgazette.co.uk/wp-content/uploads/2021/04/shutterstock_1430980418.jpg',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        requiredTotal: 500,
        imageUrl:
          'https://www.fowles.com.au/wp-content/uploads/2019/11/291019-81_8.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        requiredTotal: 500,
        imageUrl:
          'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2F9cc089a8-9e42-11e8-9371-eed14903bc84.jpg?crop=1732%2C2598%2C1108%2C79',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface => {
    return await queryInterface.bulkDelete('images', null, {});
  },
};
