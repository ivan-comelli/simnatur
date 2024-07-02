'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
          {
              id: 7,
              name: 'DAVID',
              email: 'david@gmail.com',
              password: '$2b$10$51.jNK9vBm035eJW6BzydO/GWBa4VH5Tg0Ur34T0LXIf5mN5/trHC',
              createdAt: new Date('2024-06-27 16:42:41'),
              updatedAt: new Date('2024-06-27 16:42:41')
          },
          {
              id: 8,
              name: 'testuser',
              email: 'testuser@email.com',
              password: '$2b$10$fmf5PRx002Lf685qhUdrTOJSzXbW3dlGKQJzkn36/JdC/TJ.BpxV6',
              createdAt: new Date('2024-06-27 20:06:06'),
              updatedAt: new Date('2024-06-27 20:06:06')
          }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};