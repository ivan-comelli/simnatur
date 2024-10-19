'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'additional', {
      type: Sequelize.JSON,
      allowNull: true, // Cambia a false si no quieres permitir valores nulos
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'additional');
  }
};