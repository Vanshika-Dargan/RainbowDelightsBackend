import { DataTypes, Model } from 'sequelize';


export default  (sequelize) => {
  class SpecialRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({OrderItem}) {
      // define association here
      this.hasOne(OrderItem,{foreignKey:'special_request_id'})
    }
  }
  SpecialRequest.init({
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue:DataTypes.UUIDV4
    },
    size:{
      type:DataTypes.FLOAT,
      allowNull:true,
    },
    topping:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:true
    },
    decoration_id:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:true
    },
    prize:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'SpecialRequest',
    tableName: 'specialRequest'
  });
  return SpecialRequest;
};