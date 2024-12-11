//foreign keys
const projects = require("./projects.model.js");
const assembly = require("./assembly.model.js");
const subassembly = require("./subassembly.model.js");
const items = require("./items.model.js");
const stockItems = require("./stock_items.model.js");

module.exports = (sequelize, Sequelize) => {
  const Bom = sequelize.define(
    "bom",
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
      assembly_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: assembly,
          key: "id",
        },
      },
      subassembly_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: subassembly,
          key: "id",
        },
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: items,
          key: "id",
        },
      },
      stock_items_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: stockItems,
          key: "id",
        },
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
      tableName: "bom",
    }
  );
  return Bom;
};
