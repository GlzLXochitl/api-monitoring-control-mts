//foreign keys
const users = require("./users.model.js")
const projects = require("./projects.model.js"); 

module.exports = (sequelize, Sequelize) => {
  const UsersProjects = sequelize.define
  ('projects', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    users_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: users,
        key: "id",
      },
    }, 
    project_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
          model: projects,
          key: 'id',
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
  }, {
    tableName: 'users_projects',
    timestamps: false,  
    freezeTableName: true,
});
  return UsersProjects;
};
