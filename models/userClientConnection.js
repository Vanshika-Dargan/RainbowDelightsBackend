module.exports= (sequelize,DataTypes)=>{
    const UserClientConnection= sequelize.define("UserClientConnection",{
        username:{
            type : DataTypes.STRING
        },
        operator:{
            type : DataTypes.STRING
        }
    })
    return UserClientConnection;
}
