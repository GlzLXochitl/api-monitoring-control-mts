//import the database connection
const db = require("../config/database");
const Projects = require('../models/projects.model'); // Ajusta la ruta según sea necesario

// names of the tables
const Users = db.users;
// 1. GET USERS WITH PROJECTS ASOCIATED
const getUsersProjects = async () => {
  try {
    const usersProjects = await db.users_projects.findAll({
      attributes: ["users_id", "project_id"],
      raw: true, // Returns results as object literals instead of Sequelize instances
    });
    return usersProjects;
  } catch (error) {
    console.error("Error getting users and projects:", error);
    throw error;
  }
};
// 2. DELETE ASOCIATED PROJECTS SPECIFIC
const removeSpecificProjectForUser = async (userId, projectId) => {
  try {
    // if exist is true
    const user = await db.users.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // if exist is true
    const project = await db.projects.findByPk(projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    // delete the association
    const resultado = await db.users_projects.destroy({
      where: {
        users_id: userId,
        project_id: projectId,
      },
    });
    if (resultado === 0) {
      throw new Error("Not found asociations for delete");
    }
    return resultado;
  } catch (error) {
    console.error("Error for delete", error);
    throw error;
  }
};
// 3. REMOVE ALL PROJECTS FOR USER
const removeAllProjectsForUser = async (userId) => {
  try {
    // Check if the user exists
    const user = await db.users.findByPk(userId);
    if (!user) {
      throw new Error("Users not found");
    }
    // Performs the removal of all associations for the user
    const resultado = await db.users_projects.destroy({
      where: {
        users_id: userId,
      },
    });
    if (resultado === 0) {
      throw new Error("No associations found to delete");
    }
    return resultado; // Number of rows deleted
  } catch (error) {
    console.error("Error deleting all project associations for user:", error);
    throw error;
  }
};
// 4. GET USERS ASSOCIATED WITH A SPECIFIC PROJECT
const getUsersByProject = async (project_id) => {
  try {
    const adminsProjects = await db.users_projects.findAll({
      where: { project_id }, 
      include: [
        {
          model: db.users, 
          where: { user_type_id: 2 }, 
          include: [
            {
              model: db.user_type, 
              attributes: ["type"], 
            },
          ],
          attributes: ["id", "user_number", "email"], 
        },
      ],
      attributes: ["project_id"], 
      raw: true, // Return results as object literals
    });
    return adminsProjects;
  } catch (error) {
    console.error(
      "Error getting administrators associated with the project:",
      error
    );
    throw error;
  }
};
// 5. GET USERS BY PROJECT AND WHO ARE ADMINS
const getAdminsByProject = async (project_id) => {
  try {
    const adminsProjects = await db.users_projects.findAll({
      where: { project_id }, 
      include: [
        {
          model: db.users, 
          where: { user_type_id: 1 }, 
          include: [
            {
              model: db.user_type, 
              attributes: ["type"], 
            },
          ],
          attributes: ["id", "user_number", "email"], 
        },
      ],
      attributes: ["project_id"], 
      raw: true, // Return results as object literals
    });
    return adminsProjects;
  } catch (error) {
    console.error(
      "Error getting administrators associated with the project:",
      error
    );
    throw error;
  }
};
// 5. GET USERS BY PROJECT AND WHO ARE OPERS
const getOpersByProject = async (project_id) => {
  try {
    const adminsProjects = await db.users_projects.findAll({
      where: { project_id }, 
      include: [
        {
          model: db.users, 
          where: { user_type_id: 2 }, 
          include: [
            {
              model: db.user_type, 
              attributes: ["type"], 
            },
          ],
          attributes: ["id", "user_number", "email"], 
        },
      ],
      attributes: ["project_id"], 
      raw: true, // Return results as object literals
    });
    return adminsProjects;
  } catch (error) {
    console.error(
      "Error getting administrators associated with the project:",
      error
    );
    throw error;
  }
};
// 6. ASSIGN USER TO PROJECT
const assignUserToProject = async (req, res) => {
  try {
    const userProjectData = req.body;
    const userInProject = await db.users_projects.create(userProjectData);
    return res.json(userInProject);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
};

const getProjectsByUserId = async (userId) => {
  try {
    // Obtener los proyectos relacionados con un usuario utilizando la tabla intermedia users_projects
    const userProjects = await db.users_projects.findAll({
      where: {
        users_id: userId,  // Aquí buscamos por el ID del usuario
      },
      include: [
        {
          model: db.projects,  // Incluir los proyectos relacionados
          as: 'project',  // Relación definida en users_projects
          attributes: [
            'id',
            'identification_number',
            'delivery_date',
            'completed',
            'cost_material',
            'description',
            'created_at',
            'updated_at',
          ],  // Especificar los atributos que deseas traer
        },
      ],
    });

    return userProjects;
  } catch (error) {
    throw new Error('Error retrieving projects for the user: ' + error.message);
  }
};




module.exports = {
  getUsersProjects,
  removeSpecificProjectForUser,
  removeAllProjectsForUser,
  getUsersByProject,
  getAdminsByProject,
  getOpersByProject,
  assignUserToProject,
  getProjectsByUserId
};
