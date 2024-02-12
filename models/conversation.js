import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserOperationConnection}) {
      // define association here
      this.hasOne(UserOperationConnection,{foreignKey:'connect_id'})
    }
  }
  Conversation.init({
    connection_id: {
      type:DataTypes.UUID,
      // primaryKey:true,
      // defaultValue:DataTyp
    },
    message:{
      type:DataTypes.TEXT
    },
    sender_type:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Conversation',
    tableName: 'conversation'
  });
  return Conversation;
};