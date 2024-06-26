'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlogPost.init({
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    imgSrc: DataTypes.STRING,
    category: DataTypes.JSON,
    author: DataTypes.STRING,
    date: DataTypes.STRING,
    comment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BlogPost',
  });
  return BlogPost;
};