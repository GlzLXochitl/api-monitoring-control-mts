//import the database connection
const db = require("../config/database");

// names of the tables
const Users = db.users;
//const UserTypes = db.userTypes;

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
const postUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await db.users.create(userData);
    res.json(user);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send("Error del servidor");
  }
};

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

// PUT USER FROM USERS
const putUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const [updated] = await db.users.update(updatedData, {
      where: { id: userId },
    });

    if (updated) {
      const updatedUser = await db.users.findOne({ where: { id: userId } });
      res.json(updatedUser);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).send("Error del servidor");
  }
};

// DELETE USER BY ID FROM USERS
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Obtén el ID del usuario desde los parámetros de la URL

    // Elimina el usuario de la base de datos
    const deleted = await db.users.destroy({ where: { id: userId } });

    if (deleted) {
      res.status(200).send(`Usuario con ID ${userId} eliminado exitosamente`);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).send("Error del servidor");
  }
};

// GET USERS BY USERTYPE FROM USERS
const getUsersByUserType = async (req, res) => {
  try {
    const userTypeId = parseInt(req.params.user_type_id, 10); // Convierte el parámetro a número entero

    if (isNaN(userTypeId)) {
      return res.status(400).send("ID de tipo de usuario inválido"); // Verifica que el ID sea un número válido
    }

    // Busca los usuarios con el user_type_id especificado
    const users = await db.users.findAll({
      where: { user_type_id: userTypeId },
    });

    // Retorna los usuarios encontrados o un mensaje si no se encuentran
    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res
        .status(404)
        .send(
          "No se encontraron usuarios con el tipo de usuario proporcionado"
        );
    }
  } catch (error) {
    console.error("Error al obtener los usuarios por tipo de usuario:", error);
    return res.status(500).send("Error del servidor");
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  patchUserById,
  putUserById,
  deleteUserById,
  postUser,
  getUsersByUserType,
};
