
module.exports= (sequelize,DataTypes)=>{
    const UserCutomization= sequelize.define("UserCutomization",{
        id: {
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
          },
          userId:{
            type:DataTypes.UUID,
            allowNullL:false
          },
          baseFlavourid:{
            type:DataTypes.UUID,
            allowNullL:false
          },
          toppingId:{
            type:DataTypes.ARRAY(DataTypes.UUID),
            allowNullL:false
          },
          weightId:{
            type:DataTypes.UUID,
            allowNullL:false
          },
          decorationId:{
            type:DataTypes.UUID,
            allowNullL:false
          },
          netPrice:{
            type:DataTypes.FLOAT,
            allowNullL:false
          },
          accept:{
            type:DataTypes.FLOAT
          },
          deadline:{
            type:DataTypes.DATE,
          },
          messsage:{
            type:DataTypes.TEXT
          }
    })
    return UserCutomization;

}
