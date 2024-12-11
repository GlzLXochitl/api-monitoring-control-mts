const db = require("../config/database");
const StockItems = db.stock_items; 
const Stock = db.stock;
const Items = db.items;

const getItemsWithStock = async () => {
  try {
    const itemsWithStock = await db.items.findAll({
      include: [
        {
          model: db.stock_items,
          required: true, // This ensures that only items with stock are fetched
          include: [
            {
              model: db.stock, // Include the stock table
              required: true, // Optional: only include if there is related stock
            },
          ],
        },
      ],
    });
    return itemsWithStock;
  } catch (error) {
    throw new Error("Error fetching items with stock: " + error.message);
  }
};
const createItemWithStock = async (req, res) => {
  // Destructure data from the request body
  const {
    subassembly_id,
    assembly_id,
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
    stock_quantity,
  } = req.body;

  try {
    // Create new stock
    const newStock = await Stock.create({
      stock_quantity,
    });

    // Create new item
    const newItem = await Items.create({
      subassembly_id,
      assembly_id,
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
    });

    // Relate the item with the stock
    await StockItems.create({
      // Ensure this is using the correct name
      item_id: newItem.id,
      stock_id: newStock.id,
    });

    return res.status(201).json({
      message: "Item created successfully",
      item: newItem,
      stock: newStock,
    });
  } catch (error) {
    console.error("Error creating item and stock:", error);
    return res.status(500).json({
      message: "Error creating item and stock",
      error: error.message,
    });
  }
};

const updateItemWithStock = async (req, res) => {
  const {
    project_id,
    assembly_id,
    name,
    description,
    project_assignment_quantity,
    price,
    currency,
    arrived_date,
    date_order,
    in_subassembly,
    number_material,
    number_cotizacion,
    supplier,
    stock_quantity, // Updated stock quantity
  } = req.body;

  const { item_id } = req.params; // Get the item ID from the URL

  try {
    // Check if the ID is present
    if (!item_id) {
      return res.status(400).json({
        message: "The item_id is required in the URL",
      });
    }

    // Find the item by its ID
    const item = await Items.findByPk(item_id);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    // Update the item data
    await item.update({
      project_id,
      assembly_id,
      name,
      description,
      project_assignment_quantity,
      price,
      currency,
      arrived_date,
      date_order,
      in_subassembly,
      number_material,
      number_cotizacion,
      supplier,
    });

    // Find the relationship in the stock_items table
    const stockItem = await StockItems.findOne({
      where: { item_id },
    });
    if (!stockItem) {
      return res.status(404).json({
        message: "Relationship in stock_items not found for the item",
      });
    }

    // Find the associated stock in the stock table
    const stock = await Stock.findByPk(stockItem.stock_id);
    if (!stock) {
      return res.status(404).json({
        message: "Stock not found for the item",
      });
    }

    // Update the stock quantity
    await stock.update({
      stock_quantity,
    });

    return res.status(200).json({
      message: "Item, relationship in stock_items, and stock updated successfully",
      item,
      stockItem,
      stock,
    });
  } catch (error) {
    console.error("Error updating item, stock_items, and stock:", error);
    return res.status(500).json({
      message: "Error updating item, stock_items, and stock",
      error: error.message,
    });
  }
};
const updateStockByItemName = async (req, res) => {
  const { itemName, stock_quantity } = req.body; // Receive the item name and the new quantity

  try {
    // Find the item by its name
    const item = await Items.findOne({
      where: { name: itemName },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Find the stock related to the item
    const stockItem = await StockItems.findOne({
      where: { item_id: item.id },
    });

    if (!stockItem) {
      return res.status(404).json({ message: "Stock not found for this item" });
    }

    // Update the stock quantity
    stockItem.stock_quantity = stock_quantity; // Assign the new quantity
    await stockItem.save(); // Save the changes

    return res.status(200).json({
      message: "Stock updated successfully",
      stock: stockItem,
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    return res.status(500).json({
      message: "Error updating stock",
      error: error.message,
    });
  }
};
const updateItemStock = async (req, res) => {
  const { stock_quantity } = req.body;
  const { itemId } = req.params;

  try {
    // Find the stock related to the item
    const stockItem = await StockItems.findOne({
      where: { item_id: itemId },
      include: [Stock],
    });

    if (!stockItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update the stock quantity
    await Stock.update(
      { stock_quantity },
      { where: { id: stockItem.stock_id } }
    );

    return res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    console.error("Error updating stock:", error);
    return res
      .status(500)
      .json({ message: "Error updating stock", error: error.message });
  }
};
// Delete item in stock (delete item, stock and stock_item)
const deleteItemStock = async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find the item
    const item = await Items.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Find the stock_item
    const stockItem = await StockItems.findOne({ where: { item_id: itemId } });
    if (!stockItem) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    // Find the stock
    const stock = await Stock.findByPk(stockItem.stock_id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    await stockItem.destroy(); // Delete the stock_item first to avoid foreign key constraint issues
    await item.destroy(); // Delete the item
    await stock.destroy(); // Delete the stock

    return res
      .status(200)
      .json({ message: "Item and stock deleted successfully" });
  } catch (error) {
    console.error("Error deleting item and stock:", error);
    return res
      .status(500)
      .json({ message: "Error deleting item and stock", error: error.message });
  }
};
// DELETE STOCK AND THEIR RELATIONSHIPS BY ITEM ID (delete stock, stock_item and item)
const deleteStockByItemId = async (req, res) => {
  const { itemId } = req.params;

  try {
    // Find the stock_item
    const stockItem = await StockItems.findOne({ where: { item_id: itemId } });
    if (!stockItem) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    // Find the stock
    const stock = await Stock.findByPk(stockItem.stock_id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    // Find the item
    const item = await Items.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await stockItem.destroy(); // Delete the stock_item first to avoid foreign key constraint issues
    await stock.destroy(); // Delete the stock
    await item.destroy(); // Delete the item

    return res
      .status(200)
      .json({ message: "Stock and item deleted successfully" });
  } catch (error) {
    console.error("Error deleting stock and item:", error);
    return res
      .status(500)
      .json({ message: "Error deleting stock and item", error: error.message });
  }
};

module.exports = {
  getItemsWithStock,
  createItemWithStock,
  updateItemWithStock,
  updateStockByItemName,
  updateItemStock,
  deleteItemStock,
  deleteStockByItemId,
};
