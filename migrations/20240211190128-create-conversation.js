'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conversation', {
      connection_id: {
        type:Sequelize.DataTypes.UUID,
        // primaryKey:true,
        // defaultValue:DataTyp
      },
      message:{
        type:Sequelize.DataTypes.TEXT
      },
      sender_type:{
        type:Sequelize.DataTypes.STRING
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
    await queryInterface.dropTable('conversation');
  }
};