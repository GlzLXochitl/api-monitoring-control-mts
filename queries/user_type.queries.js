//import the database connection
const db = require("../config/database");
// names of the tables
const UserType = db.user_type;

// GET ALL USER TYPES
const getAllUserTypes = async (req, res) => {
  try {
    const userTypes = await UserType.findAll();
    res.json(userTypes);
  } catch (error) {
    console.error("Error obtaining user types:", error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllUserTypes,
};
