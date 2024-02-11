import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Topping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Customization}) {
      // define association here
      this.hasMany(Customization,{foreignKey:'topping_id'})
    }
  }
  Topping.init({
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue:DataTypes.UUIDV4
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    prize:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Topping',
    tableName: 'topping'
  });
  return Topping;
};