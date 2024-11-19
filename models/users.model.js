module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user_types',  // Asegúrate que el modelo 'user_types' esté bien definido
        key: 'id',
      },
      onDelete: 'SET NULL', // Opción de eliminación segura
    },
    user_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deleted_at: {
      type: Sequelize.DATE,
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
    tableName: 'users',
    timestamps: false,
    freezeTableName: true,
    paranoid: true, // habilita la eliminación lógica
  });

  return Users;
};
