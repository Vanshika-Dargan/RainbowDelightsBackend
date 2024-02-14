'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id:{
        type:Sequelize.DataTypes.UUID,
        allowNull:false,
        defaultValue:Sequelize.DataTypes.UUIDV4,
        primaryKey:true
      },
      name: {
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      category:{
        type:Sequelize.DataTypes.ENUM('Pound Cake','Red Velvet Cake'),
        allowNull:false     
      },
      image:{
        type:Sequelize.DataTypes.STRING
      },
      quantity:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
      },
      prize:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
      },
      size:{
        type:Sequelize.DataTypes.FLOAT,
        allowNull:false
      },
      description:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:true
      },
      ingridients:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:true
      },
      customization:{
        type:Sequelize.DataTypes.BOOLEAN,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
