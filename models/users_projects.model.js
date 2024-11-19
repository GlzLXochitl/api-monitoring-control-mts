module.exports = (sequelize, Sequelize) => {
  const UsersProjects = sequelize.define('users_projects', {
    users_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE', // Si se elimina un usuario, se eliminan las relaciones
    },
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
      onDelete: 'CASCADE', // Si se elimina un proyecto, se eliminan las relaciones
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
    tableName: 'users_projects',
    timestamps: false,
    freezeTableName: true,
  });

  return UsersProjects;
};
