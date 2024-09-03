//import the database connection
const db = require('../config/database');

//names of the tables
//const Items = db.items; // It is being imported directly into the querie.
 
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
          attributes: ['id', 'description'], // include attributes of the assembly if necessary
        }
      ],
    });
    return items;
  } catch (error) {
    console.error("Error in obtaining project items:", error);
    throw error;
  }
};

const getItemsByProjectWithZeroQuantity = async (projectId) => {
  try {
    // serch for the items associated with the specific project with quantity equal to zero
    const items = await db.items.findAll({
      where: {
        project_id: projectId,
        quantity: 0, // filter by quantity equal to zero
      },
      include: [
        {
          model: db.assembly,
          attributes: ['id', 'description'], // include attributes of the assembly if necessary
        }
      ],
    });
    return items;
  } catch (error) {
    console.error("Error getting items that are not in stock:", error);
    throw error;
  }
};

module.exports = {
  getItemsByProject,
  getItemsByProjectWithZeroQuantity
};











