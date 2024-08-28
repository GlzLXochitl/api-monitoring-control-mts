const db = require("../config/database.js"); // Import the database models

const UserType = db.userTypes; // Alias for the userTypes model

// 1. Get all user types
const getAllUserTypes = async (req, res) => {
  try {
    const userTypes = await UserType.findAll(); // Fetch all user types from the database
    res.json(userTypes); // Send the fetched user types as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send an error response with status 500
  }
};

module.exports = {
  getAllUserTypes, // Export the getAllUserTypes function
};
