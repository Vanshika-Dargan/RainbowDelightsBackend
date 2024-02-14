'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({SpecialRequest, Products, Order}) {
      // define association here
      this.belongsTo(SpecialRequest,{foreignKey:'special_request_id'})
      this.belongsTo(Products,{foreignKey:'product_id'})
      this.belongsTo(Order,{foreignKey:'order_id'})
    }
  }
  OrderItem.init({
    id: {
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    customer_id:{
      type:DataTypes.UUID,
      allowNull:false
    },
    product_id:{
      type:DataTypes.UUID,
      allowNull:false
    },
    special_request_id:{
      type:DataTypes.UUID,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'orderItem'
  });
  return OrderItem;
};