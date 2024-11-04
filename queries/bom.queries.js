// import the database connection
const db = require("../config/database");
// names of the tables
const Assembly = db.assembly;
const Items = db.items;

// GET ITEMS BY PROJECT
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
// GET BOM BY ASSEMBLY WITH ITEMS MISSING
const getBomByAssemblyWithItemsMissing = async (assemblyId) => {
  try {
    // Search for items associated with the specific assembly with quantity equal to zero
    const items = await db.items.findAll({
      where: {
        assembly_id: assemblyId,
        in_subassembly: 0,
      },
    });
    return items;
  } catch (error) {
    console.error("Error getting items that are not in stock:", error);
    throw error;
  }
};
// GET ITEMS BY PROYECT BY ASSEMBLY AND PROJECT ID
const getItemsByAssemblyAndProject = async (req, res) => {
  const { projectId, assemblyId } = req.params;
  try {
    // Verify that the IDs are valid
    if (!projectId || !assemblyId) {
      return res
        .status(400)
        .json({ message: "Missing projectId or assemblyId parameters." });
    }
    // Perform the query to obtain the items
    const items = await Items.findAll({
      include: [
        {
          model: Assembly,
          where: { id: assemblyId, project_id: projectId },
          attributes: [], // Exclude the assembly data, we only want the items.
        },
      ],
    });
    // Check if items were found
    if (!items || items.length === 0) {
      return res.status(404).json({
        message: "No items were found for the specified assembly and project.",
      });
    }
    // Return items
    res.json(items);
  } catch (error) {
    console.error("Error when obtaining items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getItemsByProject,
  getBomByAssemblyWithItemsMissing,
  getItemsByAssemblyAndProject,
};
