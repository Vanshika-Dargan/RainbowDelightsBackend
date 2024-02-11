'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Products extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Products.init({
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Products',
//     tableName: 'products'
//   });
//   return Products;
// };

import { DataType ,sequelize} from 'sequelize';
module.exports= (sequelize,DataTypes)=>{
  const Message= sequelize.define("Message",{
      username:{
          type : DataTypes.STRING
      }
      ,operator:{
          type : DataTypes.STRING
      },
      message:{
          type : DataTypes.STRING
      },
      user_type:{
          type :DataTypes.STRING
      }
  })
  return Message;

}