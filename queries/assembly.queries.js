
const db = require("../config/database"); 

// names of the tables
const Assembly = db.assembly;
const Projects = db.projects;
const Items = db.items;
const Bom = db.bom;

const { Op } = require("sequelize"); // sequelize operator for queries

// 1. GET ASSEMBLY BY ID
const getAssamblyByID = async (req, res) => {
  try {
    const assemblyId = req.params.id;
    const assembly = await Assembly.findOne({ where: { id: assemblyId } });
    if (assembly) {
      res.json(assembly);
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};

// 2. GET ASSEMBLY BY DELIVERY DATE
const getAssemblyByDeliveryDate = async (req, res) => {
  try {
    const assembly = await Assembly.findAll({
      include: [
        {
          model: Projects,
          where: { completed: false },
        },
      ],
      order: [["delivery_date", "ASC"]],
    });
    if (assembly.length > 0) {
      res.json(assembly);
    } else {
      res.status(404).send("Ensambles no encontrados");
    }
  } catch (error) {
    console.error("Error al obtener los ensambles por fecha:", error);
    res.status(500).send("Error del servidor");
  }
};

// 3. GET ASSEMBLY BY COMPLETED DATE
const getAssemblyByCompletedDate = async (req, res) => {
  try {
    const currentDate = new Date(); // date of today

    const assembly = await Assembly.findAll({
      include: [
        {
          model: Projects,
          where: { completed: true },
        },
      ],
      where: {
        completed_date: {
          [Op.lte]: currentDate,
        },
      },
      order: [["completed_date", "ASC"]],
    });
    if (assembly.length > 0) {
      res.json(assembly);
    } else {
      res.status(404).send("Ensambles no encontrados");
    }
  } catch (error) {
    console.error("Error al obtener los ensambles por fecha:", error);
    res.status(500).send("Error del servidor");
  }
};

// 4. POST NEW ASSEMBLY
const postAssembly = async (req, res) => {
  try {
    const assembly = req.body;
    await Assembly.create(assembly);
    res.json(assembly);
  } catch (error) {
    console.error("Error al crear el ensamble:", error);
    res.status(500).send("Error del servidor");
  }
};

// 5. PATCH ASSEMBLY BY ID
const patchAssemblyByID = async (req, res) => {
  try {
    const assemblyId = req.params.id;
    const assembly = req.body;
    const [updated] = await Assembly.update(assembly, {
      where: { id: assemblyId },
    });
    if (updated) {
      const updatedAssembly = await Assembly.findOne({
        where: { id: assemblyId },
      });
      return res.json(updatedAssembly);
    }
    return res.status(404).json({ message: "Ensamble no encontrado" });
  } catch (error) {
    console.error("Error al actualizar el ensamble:", error);
    res.status(500).send("Error del servidor");
  }
};

// 6. PUT ASSEMBLY BY ID
const putAssemblyByID = async (req, res) => {
  try {
    const assemblyId = req.params.id; //optain the id from the url
    const {
      project_id,
      identification_number,
      description,
      delivery_date,
      completed_date,
      price,
      currency,
    } = req.body; //optain the data from the body

    //update the data in the database
    const [updated] = await Assembly.update(
      {
        project_id,
        identification_number,
        description,
        delivery_date,
        completed_date,
        price,
        currency,
      },
      { where: { id: assemblyId } }
    );

    if (updated) {
      //if the data was updated, return the updated data
      const updatedAssembly = await Assembly.findOne({
        where: { id: assemblyId },
      });
      res.json(updatedAssembly);
    } else {
      //if the data was not updated, return an error message
      res.status(404).send("Ensamble no encontrado");
    }
  } catch (error) {
    console.error("Error al reemplazar el ensamble:", error);
    res.status(500).send("Error del servidor");
  }
};

// 7. DELETE ASSEMBLY BY ID
const deleteAssemblyByID = async (req, res) => {
  try {
    const assemblyId = req.params.id; 

    // optain all the item_id from the items table where assembly_id is equal to assemblyId
    const items = await Items.findAll({
      attributes: ['id'],
      where: {
        assembly_id: assemblyId,
      },
    });

    // extract the item_id from the items
    const itemIds = items.map(item => item.id);

    // delete all the rows from the bom table where item_id is equal to itemIds
    const deletedBom = await Bom.destroy({
      where: {
        item_id: itemIds,
      },
    });

    // delete all the rows from the items table where assembly_id is equal to assemblyId
    const deletedItems = await Items.destroy({
      where: {
        assembly_id: assemblyId,
      },
    });

    // delete the row from the assembly table where id is equal to assemblyId
    const deletedAssembly = await Assembly.destroy({
      where: {
        id: assemblyId,
      },
    });

    if (deletedBom && deletedItems && deletedAssembly) {
      res.status(200).send("Action successfully completed");
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};

// 8. GET ASSEMBLY BY PROJECT FK
const getAssemblyByProjectFK = async (req, res) => {
  try {
    const projectId = req.params.id;

    // Query the database to find all assemblies associated with the given project ID
    const assembly = await Assembly.findAll({
      where: { project_id: projectId },
    });

    // Check if any assemblies were found
    if (assembly.length > 0) {
      // If assemblies are found, return them as a JSON response
      res.json(assembly);
    } else {
      // If no assemblies are found, return a 404 status with a message
      res.status(404).send("Assemblies not found");
    }
  } catch (error) {
    console.error("Error fetching assemblies by project:", error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAssamblyByID,
  getAssemblyByDeliveryDate,
  getAssemblyByCompletedDate,
  postAssembly,
  patchAssemblyByID,
  putAssemblyByID,
  deleteAssemblyByID,
  getAssemblyByProjectFK,
};
