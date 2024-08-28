const users = require("./users.model.js")
const projects = require("./projects.model.js"); //foreign key

module.exports = (sequelize, Sequelize) => {
  const UsersProjects = sequelize.define
  ('projects', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
    identification_number: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    delivery_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    completed: {
      type: Sequelize.TINYINT,
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'users_projects',
    timestamps: false,  
    freezeTableName: true,

});

  return UsersProjects;
};
