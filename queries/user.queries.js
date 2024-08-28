// get all
// get by email
// post new
// patch by id
// put by id
// delete by id

//get by user type

const db = require("../config/database"); // Import the database models

const Users = db.users; // Verifica que `users` esté definido en `db`

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    return res.json(users); // Devuelve los usuarios como una respuesta JSON
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener usuario por email
const getUserByEmail = async (email) => {
    try {
      const user = await Users.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario por email:', error);
      throw error;
    }
  };
  
  


module.exports = {
  getAllUsers,
};
