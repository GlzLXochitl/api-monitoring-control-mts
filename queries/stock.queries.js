//import the database connection
const db = require("../config/database");
// names of the tables
const Stock = db.stock;

// GET ALL ITEMS IN STOCK
const getAllStockk = async (req, res) => {
  try {
    // Check if the Stock model is correctly defined
    if (!Stock) {
      throw new Error("The Stock model is not defined.");
    }
    console.log("Initiating the consultation to obtain the stock...");
    // Perform the query to obtain all the items in stock
    const stock = await Stock.findAll();
    // Check if any results have been obtained
    if (!stock || stock.length === 0) {
      console.warn("No materials were found in stock.");
      return res
        .status(404)
        .json({ message: "No materials were found in stock." });
    }
    console.log("Materials obtained:", stock);
    res.json(stock);
  } catch (error) {
    console.error("Error in obtaining materials:", error);
    res.status(500).json({
      message: "Server error when obtaining materials.",
      error: error.message,
    });
  }
};
// GET STOCK BY ID IN TABLE STOCK
const getStockByID = async (req, res) => {
  try {
    const stockId = req.params.id;
    const stock = await Stock.findOne({ where: { id: stockId } });
    if (stock) {
      res.json(stock);
    } else {
      res.status(404).send("Material not found");
    }
  } catch (error) {
    console.error("Error in obtaining the material:", error);
    res.status(500).send("Server error");
  }
};
// POST ITEM IN STOCK TABLE
const postStock = async (req, res) => {
  try {
    const stockItem = req.body;
    await Stock.create(stockItem);
    res.json(stockItem);
  } catch (error) {
    console.error("Error when adding stock:", error);
    res.status(500).send("Server error");
  }
};
// PATCH STOCK BY ID
const patchStockByID = async (req, res) => {
  try {
    const stockId = req.params.id;
    const updates = req.body;
    // Verify if the stock with the ID provided exists
    const stock = await Stock.findOne({ where: { id: stockId } });
    if (!stock) {
      return res.status(404).send("Stock not found");
    }
    // Maintain stock in the database
    await Stock.update(updates, {
      where: { id: stockId },
    });
    // Obtain updated stock
    const updatedStock = await Stock.findOne({
      where: { id: stockId },
    });
    res.json(updatedStock);
  } catch (error) {
    console.error("Error updating stock:", error);
    res.status(500).send("Server error");
  }
};
// PUT STOCK BY ID
const putStockByID = async (req, res) => {
  try {
    const stockId = req.params.id;
    const { name, description, quantity, price, currency, supplier } = req.body; // obtain the data from the body of the request
    // update the data in the database
    const [updated] = await Stock.update(
      {
        name,
        description,
        quantity,
        price,
        currency,
        supplier,
      },
      { where: { id: stockId } }
    );
    if (updated) {
      // if the data were updated, return the updated data
      const updatedStock = await Stock.findOne({
        where: { id: stockId },
      });
      res.json(updatedStock);
    } else {
      res.status(404).send("Stock not found");
    }
  } catch (error) {
    console.error("Error when modifying the stock:", error);
    res.status(500).send("Server error");
  }
};
// DELETE STOCK BY ID
const deleteStockByID = async (req, res) => {
  try {
    const stockId = req.params.id;
    // Check if stockId exists in the Stock table
    const stockItem = await Stock.findOne({ where: { id: stockId } });
    if (stockItem) {
      // Delete the corresponding record in the Stock table
      await Stock.destroy({ where: { id: stockId } });
      res.status(200).send("Stock successfully removed");
    } else {
      res.status(404).send("Stock not found");
    }
  } catch (error) {
    console.error("Error when deleting stock:", error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllStockk,
  getStockByID,
  postStock,
  patchStockByID,
  putStockByID,
  deleteStockByID,
};
