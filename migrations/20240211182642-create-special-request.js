'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('specialRequest', {
      id:{
        type:Sequelize.DataTypes.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue:Sequelize.DataTypes.UUIDV4
      },
      size:{
        type:Sequelize.DataTypes.FLOAT,
        allowNull:true,
      },
      topping:{
        type:Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        allowNull:true
      },
      decoration_id:{
        type:Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        allowNull:true
      },
      prize:{
        type:Sequelize.DataTypes.INTEGER,
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
    await queryInterface.dropTable('specialRequest');
  }
};