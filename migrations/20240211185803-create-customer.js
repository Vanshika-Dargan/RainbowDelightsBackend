'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer', {
      id: {
        type:Sequelize.DataTypes.UUID,
        primaryKey:true,
        defaultValue:Sequelize.DataTypes.UUIDV4
      },
      name:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      contact:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        validate:{
          len:10
        }
      },
      address:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
      },
      user_type:{
        type:Sequelize.DataTypes.ENUM('admin','client'),
        allowNull:false,
        defaultValue:'client'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('customer');
  }
};