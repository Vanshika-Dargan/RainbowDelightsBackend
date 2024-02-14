'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('size', {
      id:{
        type:Sequelize.DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue:Sequelize.DataTypes.UUIDV4
      },
      kilogram:{
        type:Sequelize.DataTypes.FLOAT,
        allowNull:false
      },
      prize:{
        type:Sequelize.DataTypes.INTEGER,
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
    await queryInterface.dropTable('size');
  }
};