'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Blogs', 'desc', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('Blogs', 'category', {
      type: Sequelize.JSON,
      allowNull: true,
    });

    await queryInterface.addColumn('Blogs', 'author', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Blogs', 'date', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Blogs', 'comment', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('Blogs', 'imgSrc', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.removeColumn('Blogs', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Blogs', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Blogs',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
    await queryInterface.removeColumn('Blogs', 'desc');
    await queryInterface.removeColumn('Blogs', 'category');
    await queryInterface.removeColumn('Blogs', 'author');
    await queryInterface.removeColumn('Blogs', 'date');
    await queryInterface.removeColumn('Blogs', 'comment');
    await queryInterface.removeColumn('Blogs', 'imgSrc');
  }
};
