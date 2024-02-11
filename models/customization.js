
import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Customization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Products,Size,Topping,Decoration}) {
      // define association here
      this.belongsTo(Products,{foreignKey:'product_id'})
      this.belongsTo(Size,{foreignKey:'size_id'})
      this.belongsTo(Topping,{foreignKey:'topping_id'})
      this.belongsTo(Decoration,{foreignKey:'decoration_id'})
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