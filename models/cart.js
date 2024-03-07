
module.exports= (sequelize,DataTypes)=>{
    const Cart= sequelize.define("Cart",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
          },
          productId:{
            type: DataTypes.UUID,
            allowNull:false
          },
          userId:{
            type: DataTypes.UUID,
            allowNull:false
          },
          quantity:{
            type:DataTypes.INTEGER,
            allowNull:false
          }    
    })
    return Cart;

}