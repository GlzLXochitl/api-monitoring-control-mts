//post fk : conjunto de datos para la relacion con price_number, postiar respecto a campos de items [PENDIENTE]

//import the database connection
const db = require("../config/database");

// names of the tables
const Items = db.items;
const Assembly = db.assembly;
const Projects = db.projects;

const { Op } = require("sequelize"); // sequelize operator for queries

// 1. GET ALL ITEMS FOR TESTING PURPOSES
const getAllItems = async (req, res) => {
  try {
    const items = await Items.findAll();
    res.json(items);
  } catch (error) {
    console.error("Error al obtener los materiales:", error);
    res.status(500).send("Error del servidor");
  }
};

// 2. GET ITEMS IN STOCK only if stock_quantity > 0
const getItemsInStock = async (req, res) => {
  try {
    //const items = await Items.findAll();
    const items = await Items.findAll({
      where: {
        stock_quantity: {
          [Op.gt]: 0, // Greater than 0
        },
      },
    });
    res.json(items);
  } catch (error) {
    console.error("Error al obtener los items en stock:", error);
    res.status(500).send("Error del servidor");
  }
};

// 3. GET ITEMS BY ARRIVED DATE
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
    console.error("Error al obtener los materiales:", error);
    res.status(500).send("Error del servidor");
  }
};

// 4. GET ITEMS BY DATE ORDER
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
    console.error("Error al obtener los materiales:", error);
    res.status(500).send("Error del servidor");
  }
};

// 5. POST NEW ITEM
const postItem = async (req, res) => {
  try {
    const item = req.body;
    await Items.create(item);
    res.json(item);
  } catch (error) {
    console.error("Error al añadir el material:", error);
    res.status(500).send("Error del servidor");
  }
};

// 6. PATCH ITEM BY ID
const patchItemByID = async (req, res) => {
  try {
    const itemId = req.params.id; // get the item id from request parameters
    const updates = req.body; // get the update data from request body

    // update the item in the database
    const [updated] = await Items.update(updates, {
      where: { id: itemId },
    });

    // check if the update was successful
    if (updated) {
      // find the updated item in the database
      const updatedItem = await Items.findOne({
        where: { id: itemId },
      });
      res.json(updatedItem);
    } else {
      res.status(404).send("Material no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el material:", error);
    res.status(500).send("Error del servidor");
  }
};

// 7. PUT ITEM BY ID
const putItemByID = async (req, res) => {
  try {
    const itemId = req.params.id; //optain the id from the url
    const {
      project_id,
      assembly_id,
      name,
      description,
      quantity,
      stock_quantity,
      price,
      currency,
      arrived_date,
      date_order,
      in_assembly,
      number_material,
      number_price_item,
      supplier,
    } = req.body; //optain the data from the body

    //update the data in the database
    const [updated] = await Items.update(
      {
        project_id,
        assembly_id,
        name,
        description,
        quantity,
        stock_quantity,
        price,
        currency,
        arrived_date,
        date_order,
        in_assembly,
        number_material,
        number_price_item,
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
      res.status(404).send("Material no encontrado");
    }
  } catch (error) {
    console.error("Error al modificar el material:", error);
    res.status(500).send("Error del servidor");
  }
};

// 8. DELETE ITEM BY ID
const deleteItemByID = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deleted = await Items.destroy({ 
      where: { id: itemId },
    });
    if (deleted) {
      res.status(200).send("Action successfully completed");
    } else {
      res.status(404).send("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el material:", error);
    res.status(500).send("Error del servidor");
  }
};

// 9. GET ITEMS BY PROJECT FK FROM ITEMS TABLE AND PROJECT TABLE JOIN
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
    console.error("Error al obtener los materiales por proyecto:", error);
    res.status(500).send("Error del servidor");
  }
};

// 10. GET ITEMS BY ASSEMBLY AND PROJECT FK FROM ITEMS TABLE, ASSEMBLY TABLE AND PROJECTS TABLE JOIN
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
          attributes: ["id", "description"], // Incluye atributos del ensamblaje si es necesario
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
      "Error al obtener los materiales por ensamble y proyecto:",
      error
    );
    res.status(500).send("Error del servidor");
  }
};

module.exports = { getItemsByAssemblyProjectFK };

// 11. GET ITEMS WITH PRICE NUMBER
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
    console.error("Error al obtener el item:", error);
    res.status(500).send("Error del servidor");
  }
};

module.exports = {
  getAllItems,
  getItemsInStock,
  getItemsByArrivedDate,
  getItemsByDateOrder,
  postItem,
  patchItemByID,
  putItemByID,
  deleteItemByID,
  getItemsByProjectFK,
  getItemsByAssemblyProjectFK,
  getItemsByNumberPrice, //Quotation number
};
