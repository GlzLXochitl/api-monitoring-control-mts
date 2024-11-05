// import the database connection
const db = require("../config/database");
// names of the tables
const Subassembly = db.subassembly;

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
// POST NEW PROJECT
/*const postProject = async (req, res) => {
  try {
    const project = req.body;
    const newProject = await Projects.create(project);
    res.json(newProject); // Devolver el proyecto recién creado, que incluye el ID
    
  } catch (error) {
    console.error("Error when creating the project:", error);
    res.status(500).send("Server error");
  }
};*/





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
};