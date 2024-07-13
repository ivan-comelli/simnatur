'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    imgSrc: DataTypes.STRING,
    category: {
      type: DataTypes.JSON,
      allowNull: true
    },
    author: DataTypes.STRING,
    date: DataTypes.STRING,
    comment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};