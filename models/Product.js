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
          quantityPerBox:{
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
            allowNull:false,
            defaultValue:'Others'
          },
          image:{
            type:DataTypes.TEXT,
            allowNull:false,
          },
          // costPerQuantity:{
          //   type:DataTypes.INTEGER,
          //   allowNull:true
          // },
          ingredients:{
            type:DataTypes.ARRAY(DataTypes.STRING),
            allowNull:true
          },
          description:{
            type:DataTypes.TEXT,
            allowNull:true
          }  
    })
    return Product;

}