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
          netQuantity:{
            type:DataTypes.INTEGER,
            allowNull:false
          },
          price:{
            type:DataTypes.INTEGER,
            allowNull:false
          },
          weight:{
            type:DataTypes.DOUBLE,
            allowNull:true
          },
          category:{
            type:DataTypes.TEXT,
            allowNull:true,
            defaultValue:'Others'
          },
          image:{
            type:DataTypes.TEXT,
            allowNull:false,
          },
          description:{
            type:DataTypes.TEXT,
            allowNull:false
          },    
    })
    return Product;

}