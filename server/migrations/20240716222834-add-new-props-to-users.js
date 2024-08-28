'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'document', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'birthdate', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.JSON,
      allowNull: false,
    });
    await queryInterface.renameColumn('Users', 'name', 'username');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'document');
    await queryInterface.removeColumn('Users', 'birthdate');
    await queryInterface.removeColumn('Users', 'firstName');
    await queryInterface.removeColumn('Users', 'lastName');
    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.removeColumn('Users', 'address');
    await queryInterface.renameColumn('Users', 'username', 'name');
  }
};
