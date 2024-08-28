module.exports = (sequelize, Sequelize) => {
  const PriceNumber = sequelize.define
  ('price_number', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    number_price_item: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    supplier: {
      type: Sequelize.STRING,
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
  }, {
    tableName: 'price_number',
    timestamps: true,
    freezeTableName: true,
  });

  return PriceNumber;
};
