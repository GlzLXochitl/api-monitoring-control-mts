//foreign key
const assembly = require("./assembly.model.js"); 

module.exports = (sequelize, Sequelize) => {
  const Subassembly = sequelize.define(
    "subassembly",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      assembly_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: assembly,
          key: "id",
        },
      },
      identification_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      completed_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      completed: {
        type: Sequelize.TINYINT,
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
      tableName: "subassembly",
    }
  );
  return Subassembly;
};
