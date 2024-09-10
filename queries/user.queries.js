//import the database connection
const db = require("../config/database");

// names of the tables
const Users = db.users;
//const UserTypes = db.userTypes;

// GET ALL USERS FROM USERS 
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({   // if logic exists
      where: {
        deleted_at: null
      }
    });
    return res.json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// GET USERS BY EMAIL FROM USERS 
const getUserByEmail = async (email) => {
  try {
    const user = await Users.findOne({   // if logic exists
      where: {
        email,
        deleted_at: null
      }
    });
    return user;
  } catch (error) {
    console.error("Error al obtener el usuario por email:", error);
    throw error;
  }
};

// GET USERS BY USERNUMBER 
const getUserByUserNumber = async (user_number) => {
  try {
    const userNum = await Users.findOne({   // if logic exists
      where: { 
        user_number,
        deleted_at: null 
      } 
    });
    return userNum;
  } catch (error) {
    console.error("Error al obtener el usuario por user_number:", error);
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
const deleteUserByIdPatch = async (req, res) => {
  try {
    const userId = req.params.id; // Obtén el ID del usuario desde los parámetros de la URL

    // Elimina el usuario de la base de datos
    //const deleted = await db.users.destroy({ where: { id: userId } });

    // Elimina logicamente el usuario de la base de datos
    //UPDATE users SET deleted_at = NOW() WHERE id = 1;
    const [deleted] = await db.users.update(
      { deleted_at: db.sequelize.fn("NOW") },
      { where: { id: userId } }
    );

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
const getUsersByUserType = async (user_type_id) => {
  try {
    const users = await Users.findAll({ 
      where: { 
        user_type_id,
        deleted_at: null 
      } 
    });
    return users;
  } catch (error) {
    console.error("Error al obtener el usuario por user_type:", error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  patchUserById,
  putUserById,
  deleteUserByIdPatch,
  postUser,
  getUsersByUserType,
  getUserByUserNumber,
};
