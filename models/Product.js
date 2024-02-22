const {DataTypes} = require("sequelize");
module.exports= (sequelize,DataTypes)=>{
    const Product= sequelize.define("Product",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 ,
            primaryKey:true
          },
          name:{
            type:DataTypes.STRING,
            allowNull:false
          },
          net_quantity:{
          type:DataTypes.INTEGER,
          allowNull:false,
          },
          quantity_per_item:{
          type:DataTypes.INTEGER,
          allowNull:true,
          defaultValue:1,
          },
          cost_per_item:{
            type:DataTypes.INTEGER,
            allowNull:false
          },
          weight_per_item:{
            type:DataTypes.DOUBLE,
            allowNull:true
          },
          category:{
            type:DataTypes.TEXT,
            allowNull:true,
            defaultValue:'Others'
          },
          image:{
            type:DataTypes.STRING,
            allowNull:true,
          },
          ingredients:{
            type:DataTypes.TEXT,
            allowNull:false
          },    
    })
    return Product;

}