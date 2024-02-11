import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Customization}) {
      // define association here
      this.hasMany(Customization,{foreignKey:'size_id'})
    }
  }
  Size.init({
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      allowNull:false,
      defaultValue:DataTypes.UUIDV4
    },
    kilogram:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    prize:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Size',
    tableName: 'size'
  });
  return Size;
};