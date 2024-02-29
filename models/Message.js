module.exports= (sequelize,DataTypes)=>{
    const Message= sequelize.define("Message",{
        userName:{
            type : DataTypes.STRING
        }
        ,operator:{
            type : DataTypes.STRING
        },
        message:{
            type : DataTypes.STRING
        },
        userType:{
            type :DataTypes.STRING
        }
    })
    return Message;

}
