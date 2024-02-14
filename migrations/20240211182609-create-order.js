'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
      id: {
        type:Sequelize.DataTypes.UUID,
        primaryKey:true,
        defaultValue:Sequelize.DataTypes.UUIDV4
      },
      customer_id:{
        type:Sequelize.DataTypes.UUID,
        allowNull:false
      },
      order_datetime:{
        type:Sequelize.DataTypes.DATE,
        allowNull:false
      },
      delivery_datetime:{
        type:Sequelize.DataTypes.DATE,
        allowNull:false
      },
      payment_method:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      total_cost:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
      },
      status:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
      },
      delivery_id:{
        type:Sequelize.DataTypes.UUID,
        allowNull:false
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
    await queryInterface.dropTable('order');
  }
};