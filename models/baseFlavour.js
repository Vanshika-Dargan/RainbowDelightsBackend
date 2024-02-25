
module.exports= (sequelize,DataTypes)=>{
    const BaseFlavour= sequelize.define("BaseFlavour",{
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
          },
          image:{
            type:DataTypes.STRING,
            allowNull:false,
          }    
    })
    return BaseFlavour;

}