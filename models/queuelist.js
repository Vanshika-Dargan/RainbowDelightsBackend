'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QueueList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Customer, UserOperationConnection}) {
      // define association here
      this.belongsTo(Customer,{foreignKey:'customer_id'})
      this.hasOne(UserOperationConnection,{foreignKey:'customer_id'})
    }
  }
  QueueList.init({
    customer_id: {
      type:DataTypes.UUID,
      primaryKey:true
    },
    queue_number:{
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'QueueList',
    tableName: 'queueList'
  });
  return QueueList;
};