//foreign keys
const projects = require("./projects.model.js"); 
const price_number = require("./price_number.model.js"); 
const assembly = require("./assembly.model.js"); 

module.exports = (sequelize, Sequelize) => {
  const Items = sequelize.define(
    "items",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: projects,
          key: "id",
        },
      },
      price_number_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: price_number,
          key: "id",
        },
      },
      assembly_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: assembly,
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stock_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      arrived_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      date_order: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      in_assembly: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number_material: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: "items",
    }
  );
  return Items;
};
