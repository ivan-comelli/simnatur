'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue('images'));
      }
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
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue('category'));
      }
    },
    tag: {
      type: DataTypes.JSON,
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue("tag"));
      }
    },
    variation: {
      type: DataTypes.JSON,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue('variation'));
      }
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