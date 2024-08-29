// get all *
// get by email *
// post new
// patch by id *
// put by id 
// delete by id
//get by user type

const db = require("../config/database");

const UserTypes = db.userTypes;
const Users = require('../models/users.model'); // Ajusta la ruta según tu estructura

// GET ALL USERS FROM USERS //
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    return res.json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// GET USERS BY EMAIL FROM USERS //
const getUserByEmail = async (email) => {
  try {
    const user = await Users.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error("Error al obtener el usuario por email:", error);
    throw error;
  }
};
// POST NEW USER FROM USERS //



//  PATCH USER BY ID FROM USERS TABLE //
async function patchUserById(req, res) {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const user = await db.users.findByPk(userId);
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    await user.update(updatedData);
    res.json(user);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).send("Error en el servidor");
  }
}



// Reemplazar usuario por ID
const putUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { user_type_id, user_number, email, password } = req.body;
    const [updated] = await Users.update(
      { user_type_id, user_number, email, password },
      { where: { id: userId } }
    );
    if (updated) {
      const updatedUser = await Users.findOne({ where: { id: userId } });
      return res.json(updatedUser);
    }
    return res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    console.error("Error al reemplazar el usuario:", error);
    return res.status(500).json({ error: "Error al reemplazar el usuario" });
  }
};

// Eliminar usuario por ID
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await Users.destroy({ where: { id: userId } });
    if (deleted) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

// Obtener usuarios por tipo
const getUsersByType = async (type) => {
  try {
    const userType = await UserTypes.findOne({ where: { type } });
    if (!userType) {
      throw new Error("Tipo de usuario no encontrado");
    }
    const users = await Users.findAll({ where: { user_type_id: userType.id } });
    return users;
  } catch (error) {
    console.error("Error al obtener usuarios por tipo:", error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  patchUserById,
  putUserById,
  deleteUserById,
};




