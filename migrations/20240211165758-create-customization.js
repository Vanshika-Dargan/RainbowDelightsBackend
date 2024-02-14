'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customization', {
      id:{
        type:Sequelize.DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue:Sequelize.DataTypes.UUIDV4
      },
      product_id:{
        type:Sequelize.DataTypes.UUID,
        allowNull:false
      },
      size_id:{
        type:Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.UUID),
        allowNull:true,
      },
      topping_id:{
        type:Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.UUID),
        allowNull:true
      },
      decoration_id:{
        type:Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.UUID),
        allowNull:true
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
    await queryInterface.dropTable('customization');
  }
};