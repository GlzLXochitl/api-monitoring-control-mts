const express = require("express"); // Import the express module
const app = express();  // Create an instance of an express application

const bodyParser = require("body-parser");  // Import the body-parser middleware
app.use(bodyParser.json()); // Use the body-parser middleware to parse JSON requests

const cors = require('cors'); // Import the cors middleware
app.use(cors()); // Use the cors middleware to enable Cross-Origin Resource Sharing

const { getAllUserTypes } = require("./queries/user_type.queries"); // Import the getAllUserTypes function
const { getAllUsers } = require("./queries/user.queries");

// 1. GET ALL USER TYPES
app.get("/api/getUserTypes", (req, res) => { // Define a route to get all user types
    getAllUserTypes(req, res); // Call the getAllUserTypes function
});

//1. GET ALL USERS
app.get("/api/users",  (req, res) => {
    getAllUsers(req, res);
   
  });
//2. GET USER BY EMAIL 

// Obtener usuario por email
app.get('/api/users/email/:email', async (req, res) => {
    try {
      const user = await userQueries.getUserByEmail(req.params.email);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario por email', error });
    }
  });


// Start the server
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000
app.listen(port, () => console.log(`Server listening on port ${port}`)); // Start the server and log the port