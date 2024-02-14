'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Products,Size,Topping,Decoration}) {
      // define association here
      this.belongsTo(Products,{foreignKey:'product_id'})
      this.belongsTo(Size,{foreignKey:'id'})
      this.belongsTo(Topping,{foreignKey:'id'})
      this.belongsTo(Decoration,{foreignKey:'id'})
    }
  }
  Customization.init({
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue:DataTypes.UUIDV4
    },
    product_id:{
      type:DataTypes.UUID,
      allowNull:false
    },
    size_id:{
      type:DataTypes.ARRAY(DataTypes.UUID),
      allowNull:true,
    },
    topping_id:{
      type:DataTypes.ARRAY(DataTypes.UUID),
      allowNull:true
    },
    decoration_id:{
      type:DataTypes.ARRAY(DataTypes.UUID),
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Customization',
    tableName: 'customization'
  });
  return Customization;
};