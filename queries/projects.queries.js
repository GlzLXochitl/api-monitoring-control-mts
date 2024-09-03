// import the database connection
const db = require("../config/database");

//import the table
const Projects = db.projects;

// 1. GET ALL PROJECTS
const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.findAll();
    res.json(projects);
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    res.status(500).send("Error del servidor");
  }
};

// 2. GET PROJECT BY ID
const getProjectByID = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Projects.findOne({ where: { id: projectId } });
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};

// 3. GET ACTIVE PROJECTS
const getProjectsActives = async (req, res) => {
  try {
    const project = await Projects.findAll({ where: { completed: false } });
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener los proyectos activos:", error);
    res.status(500).send("Error del servidor");
  }
};

// 4. GET INACTIVE PROJECTS
const getProjectsInctives = async (req, res) => {
  try {
    const project = await Projects.findAll({ where: { completed: true } });
    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener los proyectos inactivos:", error);
    res.status(500).send("Error del servidor");
  }
};

// 5. GET PROJECTS BY DELIVERY DATE
const getProjectsByDeliveryDate = async (req, res) => {
  try {
    const projects = await Projects.findAll({
      where: { completed: false },
      order: [["delivery_date", "ASC"]],
    });
    if (projects.length > 0) {
      res.json(projects);
    } else {
      res.status(404).send("Proyectos no encontrados");
    }
  } catch (error) {
    console.error("Error al obtener los proyectos por fecha:", error);
    res.status(500).send("Error del servidor");
  }
};

// 6. POST NEW PROJECT
const postProject = async (req, res) => {
  try {
    const project = req.body;
    await Projects.create(project);
    res.json(project);
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};

// 7. PATCH PROJECT BY ID
const patchProjectByID = async (req, res) => {
  try {
    const projectId = req.params.id;
    const updates = req.body;
    const [updated] = await Projects.update(updates, {
      where: { id: projectId },
    });
    if (updated) {
      const updatedProject = await Projects.findOne({
        where: { id: projectId },
      });
      res.json(updatedProject);
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};

// 8. PUT PROJECT BY ID
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
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al reemplazar el proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};

// 9. DELETE PROJECT BY ID
const deleteProjectByID = async (req, res) => {
  try {
    const projectId = req.params.id;
    const deleted = await Projects.destroy({ where: { id: projectId } });
    if (deleted) {
      res.status(200).send("Action successfully completed");
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};

module.exports = {
  getAllProjects,
  getProjectByID,
  getProjectsActives,
  getProjectsInctives,
  getProjectsByDeliveryDate,
  postProject,
  patchProjectByID,
  putProjectByID,
  deleteProjectByID,
};
