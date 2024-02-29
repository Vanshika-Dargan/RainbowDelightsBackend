module.exports= (sequelize,DataTypes)=>{
    const UserClientConnection= sequelize.define("UserClientConnection",{
        userName:{
            type : DataTypes.STRING
        },
        operator:{
            type : DataTypes.STRING
        }
    })
    return UserClientConnection;
}
