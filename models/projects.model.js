module.exports = (sequelize, Sequelize) => {
  const Projects = sequelize.define
  ('projects', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    identification_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    delivery_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    completed: {
      type: Sequelize.TINYINT,
      allowNull: false,
    },
    cost_material: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
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
  }, {
    tableName: 'projects',
    timestamps: false,
    freezeTableName: true,
    
  });

  return Projects;
};
