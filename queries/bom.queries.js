//import the database connection
const db = require("../config/database");

//names of the tables
//const Items = db.items; // It is being imported directly into the querie.

// tables names
const Items = db.items;
const Assembly = db.assembly;
const Project = db.project;

const getItemsByProject = async (projectId) => {
  try {
    // serch for the items associated with the specific project
    const items = await db.items.findAll({
      where: {
        project_id: projectId,
      },
      include: [
        {
          model: db.assembly,
          attributes: ["id", "description"], // include attributes of the assembly if necessary
        },
      ],
    });
    return items;
  } catch (error) {
    console.error("Error in obtaining project items:", error);
    throw error;
  }
};

const getItemsByAssemblyWithZeroQuantity = async (assemblyId) => {
  try {
    // Buscar los ítems asociados con el assembly específico con cantidad igual a cero
    const items = await db.items.findAll({
      where: {
        identification_number: assemblyId,
        quantity: 0, // filtrar por cantidad igual a cero
      },
    });
    return items;
  } catch (error) {
    console.error("Error al obtener ítems que no están en stock:", error);
    throw error;
  }
};

module.exports = {
  getItemsByProject,
  getItemsByAssemblyWithZeroQuantity,
};
