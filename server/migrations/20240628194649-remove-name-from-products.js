'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'name');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'name', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};