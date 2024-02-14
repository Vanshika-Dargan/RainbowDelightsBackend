'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate({Customization,OrderItem}) {
      // define association here
      this.hasOne(Customization,{foreignKey:'product_id'})
      this.hasOne(OrderItem,{foreignKey:'product_id'})
    }
  }
  Products.init({
    id:{
      type:DataTypes.UUID,
      allowNull:false,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    category:{
      type:DataTypes.ENUM('Pound Cake','Red Velvet Cake'),
      allowNull:false     
    },
    image:{
      type:DataTypes.STRING
    },
    quantity:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    prize:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    size:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    description:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    ingridients:{
      type:DataTypes.TEXT,
      allowNull:true
    },
    customization:{
      type:DataTypes.BOOLEAN,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'products'
  });
  return Products;
};