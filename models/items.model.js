// foreing key
const assembly = require("./assembly.model.js");
const subassembly = require("./subassembly.model.js");
const projects = require("./projects.model.js");

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
        allowNull: true,
        references: {
          model: projects,
          key: "id",
        },
      },
      assembly_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: assembly,
          key: "id",
        },
      },
      subassembly_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: subassembly,
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subassembly_assignment_quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      arrived_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      date_order: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      in_subassembly: {
        type: Sequelize.TINYINT(1),
        allowNull: true,
      },
      number_material: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      number_cotizacion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      supplier: {
        type: Sequelize.STRING,
        allowNull: true,
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
