'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order, QueueList}) {
      // define association here
      this.hasOne(Order,{foreignKey:'customer_id'})
      this.hasOne(QueueList,{foreignKey:'customer_id'})
    }
  }
  Customer.init({
    id: {
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    contact:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        len:10
      }
    },
    address:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    user_type:{
      type:DataTypes.ENUM('admin','client'),
      allowNull:false,
      defaultValue:'client'
    }
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customer'
  });
  return Customer;
};