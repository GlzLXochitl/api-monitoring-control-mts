//import the database connection
const db = require("../config/database");
// names of the tables
const Items = db.items;
const Assembly = db.assembly;
const Subassembly = db.subassembly;
const Projects = db.projects;
const Bom = db.bom;
const { Op } = require("sequelize"); // sequelize operator for queries

// GET ALL ITEMS FOR TESTING PURPOSES
const getAllItems = async (req, res) => {
  try {
    const items = await Items.findAll();
    res.json(items);
  } catch (error) {
    console.error("Error in obtaining materials:", error);
    res.status(500).send("Server error");
  }
};
// GET ITEMS BY ARRIVED DATE
const getItemsByArrivedDate = async (req, res) => {
  try {
    const items = await Items.findAll({
      include: [
        {
          model: Projects,
          where: { completed: false },
        },
      ],
      order: [["arrived_date", "ASC"]],
    });
    res.json(items);
  } catch (error) {
    console.error("Error in obtaining materials:", error);
    res.status(500).send("Server error");
  }
};
// GET ITEMS BY DATE ORDER
const getItemsByDateOrder = async (req, res) => {
  try {
    const items = await Items.findAll({
      include: [
        {
          model: Projects,
          where: { completed: false },
        },
      ],
      order: [["date_order", "ASC"]],
    });
    res.json(items);
  } catch (error) {
    console.error("Error in obtaining materials:", error);
    res.status(500).send("Server error");
  }
};
// POST NEW ITEM
const postItem = async (req, res) => {
  try {
    const item = req.body;
    await Items.create(item); // Ensure Items.create is used correctly
    res.json(item);
  } catch (error) {
    console.error("Error when adding material:", error);
    res.status(500).send("Server error");
  }
};
// PATCH ITEM BY ID patchItemByID
const patchItemByID = async (req, res) => {
  try {
    const itemId = req.params.id; // Get the item ID from the request parameters
    const updates = req.body; // Get the update data from the request body
    // Update the item in the database
    const [updated] = await Items.update(updates, {
      where: { id: itemId },
    });
    // Check if the update was successful
    if (updated) {
      // Find and return the updated item
      const updatedItem = await Items.findOne({
        where: { id: itemId },
      });
      res.json(updatedItem);
    } else {
      // If no rows were updated, return a 404 error
      res.status(404).send("Item not found");
    }
  } catch (error) {
    // Handle any errors during the update process
    console.error("Error updating item:", error);
    res.status(500).send("Server error");
  }
};
// PUT ITEM BY ID
const putItemByID = async (req, res) => {
  try {
    const itemId = req.params.id; //optain the id from the url
    const {
      project_id,
      assembly_id,
      subassembly_id,
      name,
      description,
      subassembly_assignment_quantity,
      price,
      currency,
      arrived_date,
      date_order,
      in_subassembly,
      number_material,
      number_cotizacion,
      supplier,
    } = req.body; //optain the data from the body
    //update the data in the database
    const [updated] = await Items.update(
      {
        project_id,
        assembly_id,
        subassembly_id,
        name,
        description,
        subassembly_assignment_quantity,
        price,
        currency,
        arrived_date,
        date_order,
        in_subassembly,
        number_material,
        number_cotizacion,
        supplier,
      },
      { where: { id: itemId } }
    );
    if (updated) {
      //if the data was updated, return the updated data
      const updatedItem = await Items.findOne({
        where: { id: itemId },
      });
      res.json(updatedItem);
    } else {
      res.status(404).send("Material not found");
    }
  } catch (error) {
    console.error("Error when modifying the material:", error);
    res.status(500).send("Server error");
  }
};
// DELETE ITEM BY ID
const deleteItemByID = async (req, res) => {
  try {
    const itemId = req.params.id;
    // Check if itemId exists in Items table
    const item = await Items.findOne({ where: { id: itemId } });
    if (item) {
      // Check if item_id in Bom table is equal to itemId
      const bom = await Bom.findOne({ where: { item_id: itemId } });
      if (bom) {
        // Delete the corresponding record in the Bom table
        await Bom.destroy({ where: { item_id: itemId } });
      }
      // Delete the corresponding record in the Items table
      await Items.destroy({ where: { id: itemId } });
      res.status(200).send("Action successfully completed");
    } else {
      res.status(404).send("Item not found");
    }
  } catch (error) {
    console.error("Error deleting Material:", error);
    res.status(500).send("Server error");
  }
};
// GET ITEMS BY PROJECT FK FROM ITEMS TABLE AND PROJECT TABLE JOIN
const getItemsByProjectFK = async (req, res) => {
  try {
    const projectId = req.params.id;
    const items = await Items.findAll({
      where: { project_id: projectId },
      include: [
        {
          model: Projects,
          where: { id: projectId },
        },
      ],
    });
    res.json(items);
  } catch (error) {
    console.error("Error in obtaining materials by project:", error);
    res.status(500).send("Server error");
  }
};
// GET ITEMS BY ASSEMBLY AND PROJECT FK FROM ITEMS TABLE, ASSEMBLY TABLE AND PROJECTS TABLE JOIN
const getItemsByAssemblyProjectFK = async (req, res) => {
  try {
    const projectId = req.params.project_id;
    const assemblyId = req.params.assembly_id;
    const items = await Items.findAll({
      where: {
        project_id: projectId,
        assembly_id: assemblyId,
      },
      include: [
        {
          model: Assembly,
          attributes: ["id", "description"], // Include assembly attributes if needed
          where: { id: assemblyId },
        },
      ],
    });
    if (items.length > 0) {
      res.status(200).json(items);
    } else {
      res.status(404).json({ message: "No items found" });
    }
  } catch (error) {
    console.error(
      "Error in obtaining materials by assembly and project:",
      error
    );
    res.status(500).send("Server error");
  }
};
// GET ITEMS WITH PRICE NUMBER
const getItemsByNumberPrice = async (req, res) => {
  try {
    const number_price = req.params.number_price;
    const items = await Items.findAll({
      where: { number_price_item: number_price },
    });
    if (items.length > 0) {
      res.json(items);
    } else {
      res.status(404).send("Item no encontrado");
    }
  } catch (error) {
    console.error("Error in obtaining materials:", error);
    res.status(500).send("Server error");
  }
};
// GET ITEMS IF ARRIVED
const getItemsArrived = async (req, res) => {
  try {
    const items = await Items.findAll({
      where: {
        in_subassembly: {
          [Op.eq]: 1,
        },
      },
    });
    res.json(items);
  } catch (error) {
    console.error("Error in obtaining materials:", error);
    res.status(500).send("Server error");
  }
};
// GET ITEMS IF NOT ARRIVED
const getItemsMissing = async (req, res) => {
  try {
    const items = await Items.findAll({
      where: {
        in_subassembly: {
          [Op.eq]: 0,
        },
      },
    });
    res.json(items);
  } catch (error) {
    console.error("Error in obtaining materials:", error);
    res.status(500).send("Server error");
  }
};

// GET ITEMS BY ASSEMBLY only when the assembly have null in the subassembly_id
const getItemsByOnlyAssembly = async (req, res) => {
  try {
    const assemblyId = req.params.assembly_id;
    const items = await Items.findAll({
      where: {
        assembly_id: assemblyId,
        subassembly_id: null,
      },
    });
    res.json(items);
  } catch (error) {
    console.error("Error in obtaining materials:", error);
    res.status(500).send("Server error");
  }
};

//SEARCH ITEMs BY NAME
const getItemsByName = async (req, res) => {
  try {
    const name = req.params.name;
    const items = await Items.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    res.json(items);
  } catch (error) {
    console.error("Error in obtaining materials:", error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllItems,
  getItemsByArrivedDate,
  getItemsByDateOrder,
  postItem,
  patchItemByID,
  putItemByID,
  deleteItemByID,
  getItemsByProjectFK,
  getItemsByAssemblyProjectFK,
  getItemsByNumberPrice, //Quotation number
  getItemsArrived,
  getItemsMissing,
  getItemsByOnlyAssembly,
  getItemsByName
};
