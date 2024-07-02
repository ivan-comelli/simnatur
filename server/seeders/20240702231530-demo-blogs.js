'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Blogs', [
          {
              id: 1,
              title: 'Te Contamos los Poderes del Cardo Mariano',
              content: 'caca',
              createdAt: new Date('2024-06-29 00:48:40'),
              updatedAt: new Date('2024-06-29 00:48:40'),
              desc: 'Mucho que aprender de lo que nos rodea, y no aprestamos atencion, acompañame a ver esta magnifica historia',
              category: '["Fantasia", "Medicinal"]',
              author: 'Yo',
              date: '2024-06-06',
              comment: 3,
              imgSrc: '/img/product/silimarina_1.jpg'
          },
          {
              id: 2,
              title: 'Te Contamos los Poderes del Cardo Mariano',
              content: 'caca',
              createdAt: new Date('2024-06-29 00:48:40'),
              updatedAt: new Date('2024-06-29 00:48:40'),
              desc: 'Mucho que aprender de lo que nos rodea, y no aprestamos atencion, acompañame a ver esta magnifica historia',
              category: '["Fantasia", "Medicinal"]',
              author: 'Yo',
              date: '2024-06-06',
              comment: 3,
              imgSrc: '/img/product/silimarina_1.jpg'
          },
          {
              id: 3,
              title: 'Te Contamos los Poderes del Cardo Mariano',
              content: 'caca',
              createdAt: new Date('2024-06-29 00:48:40'),
              updatedAt: new Date('2024-06-29 00:48:40'),
              desc: 'Mucho que aprender de lo que nos rodea, y no aprestamos atencion, acompañame a ver esta magnifica historia',
              category: '["Fantasia", "Medicinal"]',
              author: 'Yo',
              date: '2024-06-06',
              comment: 3,
              imgSrc: '/img/product/silimarina_1.jpg'
          },
          {
              id: 4,
              title: 'Te Contamos los Poderes del Cardo Mariano',
              content: 'caca',
              createdAt: new Date('2024-06-29 00:48:40'),
              updatedAt: new Date('2024-06-29 00:48:40'),
              desc: 'Mucho que aprender de lo que nos rodea, y no aprestamos atencion, acompañame a ver esta magnifica historia',
              category: '["Fantasia", "Medicinal"]',
              author: 'Yo',
              date: '2024-06-06',
              comment: 3,
              imgSrc: '/img/product/silimarina_1.jpg'
          }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
      // Agrega el código de eliminación de datos si es necesario
      // Por ejemplo:
      // await queryInterface.bulkDelete('blogs', null, {});
  }
};