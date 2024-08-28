const projects = require("./projects.model.js"); //foreign key

module.exports = (sequelize, Sequelize) => {
    const Assembly = sequelize.define
    ('assembly', {
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
            key: 'id',
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
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
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
      }
    },     
      {
        timestamps: false,    
        freezeTableName: true,
        tableName: "assembly",
      }
    );
    return Assembly;
  }; 