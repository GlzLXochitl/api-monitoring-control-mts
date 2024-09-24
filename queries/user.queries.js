//import the database connection
const db = require("../config/database");
// names of the tables
const Users = db.users;

// GET ALL USERS FROM USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      where: {
        deleted_at: null,
      },
    });
    return res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    return res.status(500).json({ error: "Error getting users" });
  }
};
// GET USERS BY EMAIL FROM USERS
const getUserByEmail = async (email) => {
  try {
    const user = await Users.findOne({
      where: {
        email,
        deleted_at: null,
      },
    });
    return user;
  } catch (error) {
    console.error("Error getting the user by email:", error);
    throw error;
  }
};
// GET USERS BY USERNUMBER
const getUserByUserNumber = async (user_number) => {
  try {
    const userNum = await Users.findOne({
      where: {
        user_number,
        deleted_at: null,
      },
    });
    return userNum;
  } catch (error) {
    console.error("Error getting the user by user number:", error);
    throw error;
  }
};
// POST NEW USER FROM USERS
const postUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await db.users.create(userData);
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Server error");
  }
};
//  PATCH USER BY ID FROM USERS TABLE
async function patchUserById(req, res) {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const user = await db.users.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    await user.update(updatedData);
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Server error");
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
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Server error");
  }
};
// DELETE USER BY ID FROM USERS
const deleteUserByIdPatch = async (req, res) => {
  try {
    const userId = req.params.id;
    // Logically removes the user from the database
    // UPDATE users SET deleted_at = NOW() WHERE id = 1;
    const [deleted] = await db.users.update(
      { deleted_at: db.sequelize.fn("NOW") },
      { where: { id: userId } }
    );
    if (deleted) {
      res.status(200).send(`User with ID ${userId} successfully removed`);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Server error");
  }
};
// GET USERS BY USERTYPE FROM USERS
const getUsersByUserType = async (user_type_id) => {
  try {
    const users = await Users.findAll({
      where: {
        user_type_id,
        deleted_at: null,
      },
    });
    return users;
  } catch (error) {
    console.error("Error getting user by user type:", error);
    throw error;
  }
};
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Busca el usuario por su correo electrónico
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Genera un token o enlace para restablecer la contraseña (esto es un ejemplo básico)
    const resetToken = Math.random().toString(36).substring(2, 15); // Esto es solo un ejemplo, deberías usar un token más seguro

    // Aquí puedes guardar el token en la base de datos asociado al usuario

    // Prepara el correo electrónico
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: 
      http://localhost:3000/reset-password?token=${resetToken}`, // Aquí deberías tener una ruta en tu frontend
    };

    // Envía el correo
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Recovery email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

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
