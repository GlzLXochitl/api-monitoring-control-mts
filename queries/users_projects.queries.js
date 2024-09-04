//import the database connection
const db = require("../config/database");

// names of the tables
const Users = db.users;
const UsersProjects = db.users_projects;

// GET USERS WITH PROJECTS ASOCIATED
const getUsersProjects = async () => {
  try {
    const usersProjects = await db.users_projects.findAll({
      attributes: ["users_id", "project_id"], // Solo selecciona los atributos necesarios
      raw: true, // Devuelve los resultados como objetos literales en lugar de instancias de Sequelize
    });
    return usersProjects;
  } catch (error) {
    console.error("Error al obtener los usuarios y proyectos:", error);
    throw error;
  }
};
// DELETE ASOCIATED PROJECTS

const removeSpecificProjectForUser = async (userId, projectId) => {
  try {
    // Verifica si el usuario existe
    const user = await db.users.findByPk(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Verifica si el proyecto existe
    const project = await db.projects.findByPk(projectId);
    if (!project) {
      throw new Error("Proyecto no encontrado");
    }

    // Realiza la eliminación de la asociación
    const resultado = await db.users_projects.destroy({
      where: {
        users_id: userId,
        project_id: projectId,
      },
    });

    if (resultado === 0) {
      throw new Error("No se encontraron asociaciones para eliminar");
    }

    return resultado; // Número de filas eliminadas
  } catch (error) {
    console.error("Error al eliminar el proyecto para el usuario:", error);
    throw error;
  }
};
// REMOVE ALL PROJECTS FOR USER
const removeAllProjectsForUser = async (userId) => {
  try {
    // Verifica si el usuario existe
    const user = await db.users.findByPk(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Realiza la eliminación de todas las asociaciones para el usuario
    const resultado = await db.users_projects.destroy({
      where: {
        users_id: userId,
      },
    });

    if (resultado === 0) {
      throw new Error("No se encontraron asociaciones para eliminar");
    }

    return resultado; // Número de filas eliminadas
  } catch (error) {
    console.error(
      "Error al eliminar todas las asociaciones de proyectos para el usuario:",
      error
    );
    throw error;
  }
};

module.exports = {
  getUsersProjects,
  removeSpecificProjectForUser,
  removeAllProjectsForUser,
};
