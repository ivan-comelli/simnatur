'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Cart, { foreignKey: 'productId' });
      Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
      Product.hasMany(models.Favorite, { foreignKey: 'productId' });
    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    new: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    best: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    category: {
      type: DataTypes.JSON,
      allowNull: false
    },
    tag: {
      type: DataTypes.JSON,
      allowNull: false
    },
    variation: {
      type: DataTypes.JSON,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
