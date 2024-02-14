'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({OrderItem,DeliveryTeam}) {
      // define association here
      this.hasOne(OrderItem,{foreignKey:'order_id'})
      this.belongsTo(DeliveryTeam,{foreignKey:'delivery_id'})
    }
  }
  Order.init({
    id: {
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    customer_id:{
      type:DataTypes.UUID,
      allowNull:false
    },
    order_datetime:{
      type:DataTypes.DATE,
      allowNull:false
    },
    delivery_datetime:{
      type:DataTypes.DATE,
      allowNull:false
    },
    payment_method:{
      type:DataTypes.STRING,
      allowNull:false
    },
    total_cost:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    status:{
      type:DataTypes.STRING,
      allowNull:false
    },
    delivery_id:{
      type:DataTypes.UUID,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'order'
  });
  return Order;
};