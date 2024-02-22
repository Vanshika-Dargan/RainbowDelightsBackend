
module.exports= (sequelize,DataTypes)=>{
    const Weight= sequelize.define("Weight",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4 ,
            primaryKey:true
          },
          name:{
            type:DataTypes.STRING,
            allowNull:false
          },
          price:{
            type:DataTypes.INTEGER,
            allowNull:false
          }    
    })
    return Weight;

}