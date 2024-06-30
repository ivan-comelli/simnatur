'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'images', {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.addColumn('Products', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Products', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('Products', 'new', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
    await queryInterface.addColumn('Products', 'best', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
    await queryInterface.addColumn('Products', 'discount', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
    await queryInterface.addColumn('Products', 'category', {
      type: Sequelize.JSON,
      allowNull: false
    });
    await queryInterface.addColumn('Products', 'tag', {
      type: Sequelize.JSON,
      allowNull: false
    });
    await queryInterface.addColumn('Products', 'variation', {
      type: Sequelize.JSON,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'images');
    await queryInterface.removeColumn('Products', 'title');
    await queryInterface.removeColumn('Products', 'quantity');
    await queryInterface.removeColumn('Products', 'new');
    await queryInterface.removeColumn('Products', 'best');
    await queryInterface.removeColumn('Products', 'discount');
    await queryInterface.removeColumn('Products', 'category');
    await queryInterface.removeColumn('Products', 'tag');
    await queryInterface.removeColumn('Products', 'variation');
  }
};