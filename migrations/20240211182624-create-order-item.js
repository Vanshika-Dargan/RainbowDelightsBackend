'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orderItem', {
      id: {
        type:Sequelize.DataTypes.UUID,
        primaryKey:true,
        defaultValue:Sequelize.DataTypes.UUIDV4
      },
      customer_id:{
        type:Sequelize.DataTypes.UUID,
        allowNull:false
      },
      product_id:{
        type:Sequelize.DataTypes.UUID,
        allowNull:false
      },
      special_request_id:{
        type:Sequelize.DataTypes.UUID,
        allowNull:true
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
    await queryInterface.dropTable('orderItem');
  }
};