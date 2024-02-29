module.exports= (sequelize,DataTypes)=>{
    const User= sequelize.define("User",{
        id: {
            type:DataTypes.UUID,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
          },
          userName:{
            type:DataTypes.STRING,
            allowNull:false
          },
          email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
              isEmail:true
            }
          },
          password:{
            type:DataTypes.STRING,
            allowNull:false
          },
          // contact:{
          //   type:DataTypes.INTEGER,
          //   allowNull:false,
          //   validate:{
          //     len:10
          //   }
          // },
          // address:{
          //   type:DataTypes.TEXT,
          //   allowNull:false
          // },
          userType:{
            type:DataTypes.ENUM('admin','client'),
            allowNull:false,
            defaultValue:'client'
          }
    })
    return User;

}
