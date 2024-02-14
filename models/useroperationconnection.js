'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserOperationConnection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({QueueList,Conversation}) {
      // define association here
      this.belongsTo(QueueList,{foreignKey:'customer_id'})
      this.belongsTo(Conversation,{foreignKey:'connecton_id'})
    }
  }
  UserOperationConnection.init({
    customer_id: {
      type:DataTypes.UUID
    },
    connection_id: {
      type:DataTypes.UUID
    },
    operation_id: {
      type:DataTypes.UUID
    },
    status:{
      type:DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'UserOperationConnection',
    tableName: 'userOperationConnection'
  });
  return UserOperationConnection;
};