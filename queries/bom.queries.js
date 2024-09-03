//get by id
// get all if project is active
// get all if project is inactive

const db = require('../config/database');

//names of the tables
const Items = db.items;
const Assembly = db.assembly;
 
const getItemsByProject = async (projectId) => {
  try {
    // Buscar los items asociados al proyecto específico
    const items = await db.items.findAll({
      where: {
        project_id: projectId,
      },
      include: [
        {
          model: db.assembly,
          attributes: ['id', 'description'], // Incluye atributos del ensamblaje si es necesario
        }
      ],
    });
    return items;
  } catch (error) {
    console.error("Error al obtener los items del proyecto:", error);
    throw error;
  }
};

module.exports = {
  getItemsByProject,
};











