//foreign keys
const items = require("./items.model.js");
const stock = require("./stock.model.js");

module.exports = (sequelize, Sequelize) => {
  const StockItems = sequelize.define(
    "stock_items",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: items,
          key: "id",
        },
      },
      stock_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: stock,
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
      tableName: "stock_items",
    }
  );
  return StockItems;
};
