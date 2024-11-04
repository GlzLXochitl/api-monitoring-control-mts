// import the database connection
const db = require("../config/database");
//import the table
const Projects = db.projects;
const UsersProjects = db.users_projects;
const Assembly = db.assembly;
const Subassembly = db.subassembly;
const Items = db.items;

// GET ALL PROJECTS
const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.findAll();
    res.json(projects);
  } catch (error) {
    console.error("Error when obtaining projects:", error);
    res.status(500).send("Server error");
  }
};
// GET PROJECT BY IDENTIFICATION NUMBER
const getProjectByIdentificationNumber = async (req, res) => {
  try {
    const identificationNumber = req.params.number_id;
    const project = await Projects.findOne({
      where: {
        identification_number: identificationNumber,
      },
    });
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    console.error("Error when obtaining the project:", error);
    res.status(500).send("Server error");
  }
};
// GET PROJECT BY ID
const getProjectByID = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);
    // Validate that the project ID is a valid number.
    if (isNaN(projectId)) {
      return res.status(400).send("Invalid project ID");
    }
    // Indicate that the request is in process
    console.log("Application in process...");
    const project = await Projects.findOne({
      where: {
        id: projectId,
      },
    });
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    console.error("Error when obtaining the project:", error);
    // Check if the error is of type Sequelize
    if (error.name === "SequelizeDatabaseError") {
      res.status(500).send("Database error");
    } else {
      res.status(500).send("Server error");
    }
  }
};
// GET ACTIVE PROJECTS
const getProjectsActives = async (req, res) => {
  try {
    const project = await Projects.findAll({ where: { completed: false } });
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    console.error("Error when obtaining actives projects:", error);
    res.status(500).send("Server error");
  }
};
// GET INACTIVE PROJECTS
const getProjectsInctives = async (req, res) => {
  try {
    const project = await Projects.findAll({ where: { completed: true } });
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Project not found");
    }
  } catch (error) {
    console.error("Error when obtaining inactives projects:", error);
    res.status(500).send("Server error");
  }
};
// GET PROJECTS BY DELIVERY DATE
const getProjectsByDeliveryDate = async (req, res) => {
  try {
    const projects = await Projects.findAll({
      where: { completed: false },
      order: [["delivery_date", "ASC"]],
    });
    if (projects.length > 0) {
      res.json(projects);
    } else {
      res.status(404).send("Projects not found");
    }
  } catch (error) {
    console.error("Error when obtaining projects by date:", error);
    res.status(500).send("Server error");
  }
};
// POST NEW PROJECT
const postProject = async (req, res) => {
  try {
    const project = req.body;
    const existingProject = await Projects.findOne({
      where: { identification_number: project.identification_number },
    });
    if (existingProject) {
      res
        .status(400)
        .send("The project with this identification number already exists");
    } else {
      const newProject = await Projects.create(project);
      res.json(newProject); // Devolver el proyecto recién creado, que incluye el ID
    }
  } catch (error) {
    console.error("Error when creating the project:", error);
    res.status(500).send("Server error");
  }
};
// PATCH PROJECT BY ID
const patchProjectByID = async (req, res) => {
  try {
    const projectId = req.params.id; // Get the project ID from request parameters
    const projectData = req.body; // Get the update data from the request body
    // Update the project in the database
    const [updated] = await Projects.update(projectData, {
      where: { id: projectId },
    });
    // Check if the update was successful
    if (updated) {
      // Find and return the updated project
      const updatedProject = await Projects.findOne({
        where: { id: projectId },
      });
      return res.json(updatedProject);
    }
    // If no rows were updated, return a 404 error
    return res.status(404).json({ message: "Project not found" });
  } catch (error) {
    // Handle any errors during the update process
    console.error("Error updating the project:", error);
    res.status(500).send("Server error");
  }
};
// PUT PROJECT BY ID
const putProjectByID = async (req, res) => {
  try {
    const projectId = req.params.id; //optain the id from the url
    const {
      identification_number,
      delivery_date,
      completed,
      cost_material,
      description,
    } = req.body; //optain the data from the body
    //update the data in the database
    const [updated] = await Projects.update(
      {
        identification_number,
        delivery_date,
        completed,
        cost_material,
        description,
      },
      { where: { id: projectId } }
    );
    if (updated) {
      //if the data was updated, return the updated data
      const updatedProject = await Projects.findOne({
        where: { id: projectId },
      });
      res.json(updatedProject);
    } else {
      //if the data was not updated, return an error message
      res.status(404).send("Project not found");
    }
  } catch (error) {
    console.error("Error when replacing the project:", error);
    res.status(500).send("Server error");
  }
};
// DELETE PROJECT BY ID
const deleteProjectByID = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Eliminar registros relacionados en la tabla user_projects
    await UsersProjects.destroy({ where: { project_id: projectId } });

    // Encontrar todas las assemblyes relacionadas con el proyecto
    const assemblies = await Assembly.findAll({ where: { project_id: projectId } });

    for (const assembly of assemblies) {
      // Encontrar todas las subassemblyes relacionadas con cada assembly
      const subassemblies = await Subassembly.findAll({ where: { assembly_id: assembly.id } });

      for (const subassembly of subassemblies) {
        // Eliminar items relacionados con cada subassembly
        await Items.destroy({ where: { subassembly_id: subassembly.id } });
      }

      // Eliminar items relacionados con cada assembly
      await Items.destroy({ where: { assembly_id: assembly.id } });

      // Eliminar subassemblyes relacionadas con cada assembly
      await Subassembly.destroy({ where: { assembly_id: assembly.id } });
    }

    // Eliminar assemblyes relacionadas con el proyecto
    await Assembly.destroy({ where: { project_id: projectId } });

    // Eliminar el proyecto de la tabla projects
    const project = await Projects.findByPk(projectId);
    if (project) {
      await Projects.destroy({ where: { id: projectId } });
      res.status(200).send("Proyecto y registros relacionados eliminados exitosamente");
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el proyecto y registros relacionados:", error);
    res.status(500).send("Error del servidor");
  }
};

module.exports = {
  getAllProjects,
  getProjectByIdentificationNumber,
  getProjectByID,
  getProjectsActives,
  getProjectsInctives,
  getProjectsByDeliveryDate,
  postProject,
  patchProjectByID,
  putProjectByID,
  deleteProjectByID,
};
