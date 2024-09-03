//import the database connection
const db = require("../config/database");

// names of the tables
const UserType = db.user_type;

// 1. Get all user types
const getAllUserTypes = async (req, res) => {
  try {
    const userTypes = await UserType.findAll(); // Use the alias UserType
    res.json(userTypes);
  } catch (error) {
    console.error("Error al obtener los tipos de usuario:", error);
    res.status(500).send("Error del servidor");
  }
};

module.exports = {
  getAllUserTypes, // Export the getAllUserTypes function
};

