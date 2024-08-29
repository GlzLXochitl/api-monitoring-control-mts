// get by delivery date *
// get by completed date *
// post new *
// patch by id *
// put by id ??
// delete by id *

// get by project [PENDIENTE]

const db = require("../config/database"); //import the database connection

// names of the tables
const Assembly = db.assembly;
const Projects = db.projects;

const { Op } = require("sequelize"); // sequelize operator for queries

// 1. GET ASSEMBLY BY DELIVERY DATE
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

// 2. GET ASSEMBLY BY COMPLETED DATE
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

// 3. POST NEW ASSEMBLY
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

// 4. PATCH ASSEMBLY BY ID
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

// 5. PUT ASSEMBLY BY ID


// 6. DELETE ASSEMBLY BY ID
const deleteAssemblyByID = async (req, res) => {
  try {
    const assemblyId = req.params.id;
    const deleted = await Assembly.destroy({
      where: { id: assemblyId },
    });
    if (deleted) {
      res.status(200).send("Action successfully completed");
    } else {
      res.status(404).send("Ensamble no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el ensamble:", error);
    res.status(500).send("Error del servidor");
  }
};

module.exports = {
  getAssemblyByDeliveryDate,
  getAssemblyByCompletedDate,
  postAssembly,
  patchAssemblyByID,
  //putAssemblyByID,
  deleteAssemblyByID,
};
