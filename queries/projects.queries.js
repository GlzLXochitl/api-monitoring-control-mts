// import the database connection
const db = require("../config/database");

//import the table
const Projects = db.projects;
const UsersProjects = db.users_projects;
const Assembly = db.assembly;
const Items = db.items;
const Bom = db.bom;

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

// 2. GET PROJECT BY IDENTIFICATION NUMBER
const getProjectByIdentificationNumber = async (req, res) => {
  try {
    const identificationNumber = req.params.number_id;
    const project = await Projects.findOne({
      where: { 
        identification_number: identificationNumber 
      },
    });
    if (project) {
      res.json(project);
    }
  }
  catch (error) {
    console.error("Error al obtener el proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};

// 3. GET PROJECT BY ID
const getProjectByID = async (req, res) => {
  try {
    const projectId = parseInt(req.params.id, 10);

    // Validar que el ID del proyecto sea un número válido
    if (isNaN(projectId)) {
      return res.status(400).send("ID de proyecto inválido");
    }

    // Indicar que la solicitud está en proceso
    console.log("Solicitud en proceso...");

    const project = await Projects.findOne({ 
      where: { 
        id: projectId 
      } 
    });

    if (project) {
      res.json(project);
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
    
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);

    // Verificar si el error es de tipo Sequelize
    if (error.name === 'SequelizeDatabaseError') {
      res.status(500).send("Error en la base de datos");
    } else {
      res.status(500).send("Error del servidor");
    }
  }
};

// 4. GET ACTIVE PROJECTS
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

// 5. GET INACTIVE PROJECTS
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

// 6. GET PROJECTS BY DELIVERY DATE
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

// 7. POST NEW PROJECT
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

// 8. PATCH PROJECT BY ID
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

// 9. PUT PROJECT BY ID
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

// 10. DELETE PROJECT BY ID
const deleteProjectByID = async (req, res) => {
  try {
    const projectId = req.params.id; //optain the id from the url
    const deletedUsersProjects = await UsersProjects.destroy({
      where: {
        project_id: projectId,
      },
    });
    const deletedBom = await Bom.destroy({
      where: {
        project_id: projectId,
      },
    });
    const deletedItems = await Items.destroy({
      where: {
        project_id: projectId,
      },
    });
    const deletedAssembly = await Assembly.destroy({
      where: {
        project_id: projectId,
      },
    });
    const deleted = await Projects.destroy({
      where: {
        id: projectId,
      },
    });
    if (deletedUsersProjects, deletedBom, deletedItems, deletedAssembly, deleted) {
      res.status(200).send("Action successfully completed");
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};


/*const deleteProjectByID = async (req, res) => {
  try {
    const projectId = req.params.id;
    const deleted = await Projects.destroy({ 
      where: { id: projectId }
    });
    if (deleted) {
      res.status(200).send("Action successfully completed");
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};*/

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
