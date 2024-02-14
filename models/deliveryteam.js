'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DeliveryTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order}) {
      // define association here
      this.hasMany(Order,{foreignKey:'delivery_id'})
    }
  }
  DeliveryTeam.init({
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
      validate: {
        len: 10
      }
    }
  }, {
    sequelize,
    modelName: 'DeliveryTeam',
    tableName: 'deliveryTeam'
  });
  return DeliveryTeam;
};