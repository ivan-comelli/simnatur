'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Products', [
          {
              id: 7,
              description: 'La silimarina es un compuesto derivado del cardo mariano, conocido por sus propiedades hepatoprotectoras. Se utiliza comúnmente en forma de comprimidos para apoyar la salud del hígado.',
              price: 5000,
              createdAt: new Date('2024-06-29 00:09:18'),
              updatedAt: new Date('2024-06-29 00:09:18'),
              images: '["/img/product/silimarina.webp", "/img/product/silimarina_1.jpg"]',
              title: 'Comprimidos de Silimarina',
              quantity: 10,
              new: true,
              best: false,
              discount: 15,
              category: '["Hepático", "Comprimidos"]',
              tag: '["Cuidado", "Higado", "Natural"]',
              variation: null
          },
          {
              id: 8,
              description: 'Artemisa es una planta herbácea conocida por sus propiedades medicinales y aromáticas. Sus hojas son de color verde grisáceo y tienen un aroma distintivo.',
              price: 4000,
              createdAt: new Date('2024-06-29 00:17:46'),
              updatedAt: new Date('2024-06-29 00:17:46'),
              images: '["/img/product/artemisia.jpg", "/img/product/artemisia_1.jpg"]',
              title: 'Comprimidos de Artemisia',
              quantity: 40,
              new: true,
              best: false,
              discount: 5,
              category: '["Antiinflamatorio"]',
              tag: '["Natural", "Verde"]',
              variation: null
          }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
      // Agrega el código de eliminación de datos si es necesario
      // Por ejemplo:
      // await queryInterface.bulkDelete('products', null, {});
  }
};