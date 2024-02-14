'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userOperationConnection', {
      customer_id: {
        type:Sequelize.DataTypes.UUID
      },
      connection_id: {
        type:Sequelize.DataTypes.UUID
      },
      operation_id: {
        type:Sequelize.DataTypes.UUID
      },
      status:{
        type:Sequelize.DataTypes.BOOLEAN
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
    await queryInterface.dropTable('userOperationConnection');
  }
};