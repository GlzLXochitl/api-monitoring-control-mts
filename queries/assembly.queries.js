// import the database connection
const db = require("../config/database");
// names of the tables
const Assembly = db.assembly;
const Projects = db.projects;
const Items = db.items;
const Bom = db.bom;
const { Op } = require("sequelize"); // sequelize operator for queries

// GET ASSEMBLY BY ID
const getAssamblyByID = async (req, res) => {
  try {
    const assemblyId = req.params.id;
    const assembly = await Assembly.findOne({ where: { id: assemblyId } });
    if (assembly) {
      res.json(assembly);
    } else {
      res.status(404).send("Assembly not found");
    }
  } catch (error) {
    console.error("Error in obtaining the assembly:", error);
    res.status(500).send("Server error");
  }
};
// GET ASSEMBLY BY DELIVERY DATE
const getAssemblyByDeliveryDate = async (req, res) => {
  try {
    const assemblies = await Assembly.findAll({
      include: [
        {
          model: Projects,
          where: { completed: 0 },
        },
      ],
      order: [["delivery_date", "ASC"]],
    });

    if (!assemblies.length) {
      return res.status(404).json({ message: "Assembly not found" });
    }
    res.json(assemblies);
  } catch (error) {
    console.error("Error in obtaining the assembly by date:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// GET ASSEMBLY BY COMPLETED DATE
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
      res.status(404).send("Assembly not found");
    }
  } catch (error) {
    console.error("Error in obtaining the assembly by date:", error);
    res.status(500).send("Server error");
  }
};
// POST NEW ASSEMBLY
/*const postAssembly = async (req, res) => {
  try {
    const assembly = req.body;
    await Assembly.create(assembly);
    res.json(assembly);
  } catch (error) {
    console.error("Error when creating the assembly:", error);
    res.status(500).send("Server error");
  }
};*/
// POST NEW ASSEMBLY
const postAssembly = async (req, res) => {
  try {
    const assembly = req.body;
    const newAssembly = await Assembly.create(assembly);
    res.json(newAssembly);
  } catch (error) {
    console.error("Error when creating the assembly:", error);
    res.status(500).send("Server error");
  }
};

// PATCH ASSEMBLY BY ID
const patchAssemblyByID = async (req, res) => {
  try {
    const assemblyId = req.params.id; // Get the assembly ID from request parameters
    const assembly = req.body; // Get the update data from the request body

    // Fetch the existing assembly
    const existingAssembly = await Assembly.findOne({ where: { id: assemblyId } });

    if (!existingAssembly) {
      return res.status(404).json({ message: "Assembly not found" });
    }

    // Check if there are any changes
    const isChanged = Object.keys(assembly).some(key => assembly[key] !== existingAssembly[key]);

    if (isChanged) {
      // Update the assembly in the database
      const [updated] = await Assembly.update(assembly, {
        where: { id: assemblyId },
      });

      if (updated > 0) {
        // Find and return the updated assembly
        const updatedAssembly = await Assembly.findOne({
          where: { id: assemblyId },
        });
        return res.json(updatedAssembly);
      }
    }

    // If no changes, return the existing assembly
    return res.json(existingAssembly);
  } catch (error) {
    // Handle any errors during the update process
    console.error("Error updating the assembly:", error);
    res.status(500).send("Server error");
  }
};
/*
const patchAssemblyByID = async (req, res) => {
  try {
    const assemblyId = req.params.id; // Get the assembly ID from request parameters
    const assembly = req.body; // Get the update data from the request body
    // Update the assembly in the database
    const [updated] = await Assembly.update(assembly, {
      where: { id: assemblyId },
    });
    // Check if the update was successful
    if (updated) {
      // Find and return the updated assembly
      const updatedAssembly = await Assembly.findOne({
        where: { id: assemblyId },
      });
      return res.json(updatedAssembly);
    }
    // If no rows were updated, return a 404 error
    return res.status(404).json({ message: "Assembly not found" });
  } catch (error) {
    // Handle any errors during the update process
    console.error("Error updating the assembly:", error);
    res.status(500).send("Server error");
  }
};
*/
// PUT ASSEMBLY BY ID
const putAssemblyByID = async (req, res) => {
  try {
    const assemblyId = req.params.id; //optain the id from the url
    const {
      project_id,
      assembly_identification_number,
      description,
      delivery_date,
      completed_date,
      price,
      currency,
      completed_assembly,
    } = req.body; //optain the data from the body
    //update the data in the database
    const [updated] = await Assembly.update(
      {
        project_id,
        assembly_identification_number,
        description,
        delivery_date,
        completed_date,
        price,
        currency,
        completed_assembly,
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
      res.status(404).send("Assembly not found");
    }
  } catch (error) {
    console.error("Failure to replace assembly:", error);
    res.status(500).send("Server error");
  }
};
// DELETE ASSEMBLY BY ID
const deleteAssemblyByID = async (req, res) => {
  try {
    const assemblyId = req.params.id;
    // Get all item_id from items table where assembly_id is equal to assemblyId
    const items = await Items.findAll({
      attributes: ["id"],
      where: {
        assembly_id: assemblyId,
      },
    });
    // Extract item_id from items
    const itemIds = items.map((item) => item.id);
    // Delete all rows of table bom where item_id is equal to itemIds
    const deletedBom = await Bom.destroy({
      where: {
        item_id: itemIds,
      },
    });
    // If nothing is found in bom that matches the item_id, continue
    if (deletedBom === 0 || deletedBom) {
      // Delete all rows in the items table where assembly_id is equal to assemblyId
      const deletedItems = await Items.destroy({
        where: {
          assembly_id: assemblyId,
        },
      });
      // Delete the row of the assembly table where id is equal to assemblyId
      const deletedAssembly = await Assembly.destroy({
        where: {
          id: assemblyId,
        },
      });
      if (deletedAssembly) {
        res.status(200).send("Successfully deleted assembly");
        if (deletedItems && deletedAssembly) {
          console.log("Action successfully completed");
        }
      } else {
        res.status(404).send("Assembly not found");
      }
    } else {
      res
        .status(404)
        .send("No records were found in BOM for the specified items.");
    }
  } catch (error) {
    console.error("Error deleting the assembly:", error);
    res.status(500).send("Server error");
  }
};
// GET ASSEMBLY BY PROJECT FK
const getAssemblyByProjectFK = async (req, res) => {
  try {
    const projectId = req.params.id;
    const assembly = await Assembly.findAll({
      where: {
        project_id: projectId,
      },
    });
    if (assembly.length > 0) {
      res.json(assembly);
    } else {
      res.status(404).send("Assamblie not found");
    }
  } catch (error) {
    console.error("Error obtaining project assemblies:", error);
    res.status(500).send("Server error");
  }
};
/*
const getAssemblyByProjectFK = async (req, res) => {
  try {
    const projectId = req.params.id;
    const assembly = await Assembly.findAll({
      where: {
        project_id: projectId,
      },
    });
    res.status(200).json({
      message: assembly.length > 0 ? "Assemblies found" : "No assemblies found",
      data: assembly,
    });
  } catch (error) {
    console.error("Error obtaining project assemblies:", error);
    res.status(500).send("Server error");
  }
};
*/
// GET ASSEMBLY ARRIVED
const getAssemblyArrived = async (req, res) => {
  try {
    const assembly = await Assembly.findAll({
      where: {
        completed_assembly: {
          [Op.eq]: 1,
        },
      },
    });
    res.json(assembly);
  } catch (error) {
    console.error("Error in obtaining existing materials:", error);
    res.status(500).send("Server error");
  }
};
// GET ASSEMBLY MISSING
const getAssemblyMissing = async (req, res) => {
  try {
    const assembly = await Assembly.findAll({
      where: {
        completed_assembly: {
          [Op.eq]: 0,
        },
      },
    });
    res.json(assembly);
  } catch (error) {
    console.error("Error in obtaining existing materials:", error);
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
  getAssemblyArrived,
  getAssemblyMissing,
};
