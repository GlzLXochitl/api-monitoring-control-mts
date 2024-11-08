// import the database connection
const db = require("../config/database");

// names of the tables
const Subassembly = db.subassembly;
const Assembly = db.assembly;
const Item = db.items;

// POST NEW SUBASSEMBLY
const postSubassembly = async (req, res) => {
    try {
      const subassembly = req.body;
      const newSubassembly = await Subassembly.create(subassembly);
      res.json(newSubassembly);
    } catch (error) {
      console.error("Error when creating the subassembly:", error);
      res.status(500).send("Server error");
    }
  };

// GET SUBASSEMBLY BY ASSEMBLY ID
const getSubassemblyByAssembly = async (req, res) => {
    try {
      const id = req.params.id;
      const subassembly = await Subassembly.findAll({
        where: { assembly_id: id },
      });
      if (subassembly.length > 0) {
        res.json(subassembly);
      } else {
        res.status(404).send("Subassembly not found");
      }
    } catch (error) {
      console.error("Error in obtaining the subassembly by assembly:", error);
      res.status(500).send("Server error");
    }
  };

// GET ITEMS BY SUBASSEMBLY ID
const getSubassemblyItems = async (req, res) => {
    // get all items to the const Item = db.items; when camp subassembly_id is equal to the id in the request
    try {
      const id = req.params.id;
      const items = await Item.findAll({
        where: { subassembly_id: id },
      });
      if (items.length > 0) {
        res.json(items);
      } else {
        res.status(404).send("Items not found");
      }
    } catch (error) {
      console.error("Error in obtaining the items by subassembly:", error);
      res.status(500).send("Server error in obtaining the items by subassembly");
    }
    
  };



/* GET SUBASSEMBLY BY COMPLETED DATE
const getSubassemblyByCompletedDate = async (req, res) => {
    try {
      const currentDate = new Date(); // date of today
      const subassembly = await Subassembly.findAll({
        include: [
          {
            model: Assembly,
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
      if (subassembly.length > 0) {
        res.json(subassembly);
      } else {
        res.status(404).send("Subassembly not found");
      }
    } catch (error) {
      console.error("Error in obtaining the subassembly by date:", error);
      res.status(500).send("Server error");
    }
  };

// GET SUBASSEMBLY BY DELIVERY DATE
const getSubassemblyByDeliveryDate = async (req, res) => {
    try {
      const subassemblies = await Subassembly.findAll({
        include: [
          {
            model: Assembly,
            where: { completed: 0 },
          },
        ],
        order: [["delivery_date", "ASC"]],
      });
  
      if (!subassemblies.length) {
        return res.status(404).json({ message: "Subassembly not found" });
      }
      res.json(subassemblies);
    } catch (error) {
      console.error("Error in obtaining the subassembly by date:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };*/

module.exports = {
    postSubassembly,
    /*getSubassemblyByCompletedDate,
    getSubassemblyByDelivery*/
    getSubassemblyByAssembly,
    getSubassemblyItems
};