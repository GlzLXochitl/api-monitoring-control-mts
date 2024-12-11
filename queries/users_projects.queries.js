const db = require("../config/database");
const Projects = require('../models/projects.model'); 
const Users = db.users;

// GET USERS WITH ASSOCIATED PROJECTS
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

// DELETE SPECIFIC ASSOCIATED PROJECT
const removeSpecificProjectForUser = async (userId, projectId) => {
  try {
    // Check if the user exists
    const user = await db.users.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // Check if the project exists
    const project = await db.projects.findByPk(projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    // Delete the association
    const resultado = await db.users_projects.destroy({
      where: {
        users_id: userId,
        project_id: projectId,
      },
    });
    if (resultado === 0) {
      throw new Error("No associations found to delete");
    }
    return resultado;
  } catch (error) {
    console.error("Error deleting association", error);
    throw error;
  }
};

// REMOVE ALL PROJECTS FOR USER
const removeAllProjectsForUser = async (userId) => {
  try {
    // Check if the user exists
    const user = await db.users.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // Perform the removal of all associations for the user
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

// GET USERS ASSOCIATED WITH A SPECIFIC PROJECT
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

// GET USERS BY PROJECT AND WHO ARE ADMINS
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

// GET USERS BY PROJECT AND WHO ARE OPERATORS
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

// ASSIGN USER TO PROJECT
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

// GET PROJECTS BY USER ID
const getProjectsByUserId = async (userId) => {
  try {
    // Get the projects related to a user using the intermediate table users_projects
    const userProjects = await db.users_projects.findAll({
      where: {
        users_id: userId,  // Search by user ID
      },
      include: [
        {
          model: db.projects,  // Include related projects
          as: 'project',  // Relation defined in users_projects
          attributes: [
            'id',
            'identification_number',
            'delivery_date',
            'completed',
            'cost_material',
            'description',
            'created_at',
            'updated_at',
          ],  // Specify the attributes you want to bring
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
