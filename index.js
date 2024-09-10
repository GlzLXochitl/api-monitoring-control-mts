const express = require("express"); // importt the express library
const app = express(); // create an instance of express
//const router = express.Router(); // create a new router object
// Importa el objeto db desde la configuración de la base de datos
const db = require('./config/database');

const bodyParser = require("body-parser"); // import the body-parser library
app.use(bodyParser.json()); // use the body-parser middleware

const cors = require("cors"); // Importa el middleware cors
app.use(cors()); //use the cors middleware to enable cross-origin resource sharing

// const db = require('./config/database'); // import the database connection
//const PriceNumber = require('./models/price_number.model'); // Import the PriceNumber model

const {
  removeSpecificProjectForUser,
  removeAllProjectsForUser,
  getUsersProjects,
  getUsersByProject,
  getAdminsByProject,
  assignUserToProject,
  //postUserInProject   //only test, not necessary 
  } = require("./queries/users_projects.queries");
const { getAllUserTypes } = require("./queries/user_type.queries");
const {
  getAllUsers, 
  getUserByEmail, 
  getUserByUserNumber, 
  postUser, 
  patchUserById,
  putUserById,
  deleteUserByIdPatch,  // logic delete
  getUsersByUserType, //
} = require("./queries/user.queries.js");
const {
  getAllProjects,
  getProjectByIdentificationNumber,
  getProjectByID,
  getProjectsActives,
  getProjectsInctives,
  getProjectsByDeliveryDate,
  postProject,
  patchProjectByID,
  putProjectByID,
  deleteProjectByID,
} = require("./queries/projects.queries");
const {
  getAssemblyByProjectFK,
  getAssamblyByID,
  getAssemblyByDeliveryDate,
  getAssemblyByCompletedDate,
  postAssembly,
  patchAssemblyByID,
  putAssemblyByID,
  deleteAssemblyByID,
} = require("./queries/assembly.queries");
const {
  getItemsByProject,
  getItemsByAssemblyWithZeroQuantity,
} = require("./queries/bom.queries");
const {
  getAllItems, // only for testing
  getItemsInStock,
  getItemsByArrivedDate,
  getItemsByDateOrder,
  postItem,
  patchItemByID,
  putItemByID,
  deleteItemByID,
  getItemsByProjectFK,
  getItemsByAssemblyProjectFK,
  getItemsByNumberPrice, //Quotation number
} = require("./queries/items.queries");

///////////////////////////////////////////////////////////////// TEST ENDPOINT

// TEST ROUTE TO CHECK IF THE SERVER IS RUNNING
app.get("/api/test", (req, res) => {
  res.send("Successfully connected to the server");
});

///////////////////////////////////////////////////////////////// USER_TYPES TABLE

// 1. GET ALL USER TYPES FROM USER_TYPES TABLE
app.get("/api/getUserTypes", (req, res) => {
  getAllUserTypes(req, res);
});

///////////////////////////////////////////////////////////////// USERS TABLE

// GET ALL USERS FROM USERS //
app.get("/api/getUsers", (req, res) => {
  getAllUsers(req, res);
});

// GET USER BY EMAIL FROM USERS //
app.get("/api/users/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el usuario por email:", error);
    res.status(500).send("Error en el servidor");
  }
});

// GET USER FROM USERNUMBER 
app.get("/api/users/userNum/:userNum", async (req, res) => {
  try {
    const user_number = req.params.userNum;
    const userNum = await getUserByUserNumber(user_number);
    if (userNum) {
      res.json(userNum);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el usuario por usernumber:", error);
    res.status(500).send("Error en el servidor");
  }
});

// PATCH USER BY ID FROM USERS //
app.patch("/api/users/:id", (req, res) => {
  patchUserById(req, res);
});

// POST A NEW USER IN USERS //
app.post("/api/users", (req, res) => {
  postUser(req, res);
});

// PUT USER FROM USERS
app.put("/api/users/:id", (req, res) => {
  putUserById(req, res);
});

//DELETE USER BY ID FROM USERS
app.patch("/api/users/logicDelete/:id", (req, res) => { 
  deleteUserByIdPatch(req, res);
});

// GET USERS BY USERTYPE FROM USERS
app.get("/getUsersByUserType/:id", async (req, res) => {
  try {
    const user_type_id = parseInt(req.params.id, 10); // Convierte el parámetro a número entero

    if (isNaN(user_type_id) || user_type_id <= 0) {
      return res.status(400).send("ID inválido");
    }

    // Llama a la función para obtener usuarios por tipo de usuario
    const users = await getUsersByUserType(user_type_id);

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).send("No se encontraron usuarios con el tipo de usuario proporcionado");
    }
  } catch (error) {
    console.error("Error al obtener los usuarios por tipo de usuario:", error);
    res.status(500).send("Error del servidor");
  }
});

////////////////////////////////////////////////////////////////// USER_PROYECTS TABLE

// DELETE PROJECTS FOR A SPECIFIC USER 
app.delete('/usuarios/:userId/proyectos/:projectId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const projectId = parseInt(req.params.projectId, 10);
    const resultado = await removeSpecificProjectForUser(userId, projectId);
    res.json({ mensaje: `Se eliminó el proyecto con ID ${projectId} para el usuario con ID ${userId}` });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el proyecto para el usuario', error: error.message });
  }
});

/// GET USERS WITH PROYECTS ASOCIATED
app.get("/api/users-projects", async (req, res) => {
  try {
    const usersProjects = await getUsersProjects();
    res.json(usersProjects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios y proyectos" });
  }
});

// Middleware para manejar errores asíncronos
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Ruta para asignar un proyecto a un usuario
app.post('/assign-project', async (req, res) => {
  const { userId, projectId, additionalData } = req.body;

  try {
    // Llama a la función para asignar el proyecto al usuario
    const result = await assignUserToProject(userId, projectId, additionalData);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al asignar el proyecto al usuario:', error);
    res.status(500).json({ message: 'Error al asignar el proyecto al usuario' });
  }
});

// DELETE ALL PROJECTS FOR USER
app.delete("/api/usuarios/:userId/proyectos", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const resultado = await removeAllProjectsForUser(userId);
    res.json({
      mensaje: `Se eliminaron ${resultado} asociaciones de proyectos para el usuario con ID ${userId}`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje:
        "Error al eliminar todas las asociaciones de proyectos para el usuario",
      error: error.message,
    });
  }
});

// USERS FROM ASOCIATED PROYECT IN SPECIFIC
app.get("/api/projects/:project_id/users", async (req, res) => {
  try {
    const project_id = req.params.project_id; // Obtener el project_id de la URL
    const users = await getUsersByProject(project_id);

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).send("No se encontraron usuarios para este proyecto");
    }
  } catch (error) {
    console.error("Error al obtener los usuarios del proyecto:", error);
    res.status(500).send("Error en el servidor");
  }
});

// GET USERS BY PROJECT AND WHO ARE ADMINS
app.get("/api/projects/:project_id/admins", async (req, res) => {
  try {
    const project_id = req.params.project_id; // Obtener el project_id de la URL
    const admins = await getAdminsByProject(project_id);

    if (admins.length > 0) {
      res.json(admins);
    } else {
      res
        .status(404)
        .send("No se encontraron administradores para este proyecto");
    }
  } catch (error) {
    console.error("Error al obtener los administradores del proyecto:", error);
    res.status(500).send("Error en el servidor");
  }
});

// POST, CREATE A NEW USER IN A PROJECT -> ONLY FOR TESTING
/*app.post("/api/user_project", async (req, res) => {
  postUserInProject(req, res);
});*/

///////////////////////////////////////////////////////////////// PROJECTS TABLE

// 1. GET ALL PROJECTS FROM PROJECTS TABLE -> ONLY FOR TESTING
app.get("/api/getProjects", (req, res) => {
  getAllProjects(req, res);
});

// 2. GET PROJECT BY IDENTIFICATION NUMBER FROM PROJECTS TABLE
app.get("/api/getProjects/identification_number/:number_id", (req, res) => {
  getProjectByIdentificationNumber(req, res);
});

// 3. GET PROJECT BY ID FROM PROJECTS TABLE
app.get("/api/getProjects/id/:id", (req, res) => {
  getProjectByID(req, res);
});

// 4. GET ACTIVE PROJECTS FROM PROJECTS TABLE
app.get("/api/getProjectsActives", (req, res) => {
  getProjectsActives(req, res);
});

// 5. GET INACTIVE PROJECTS FROM PROJECTS TABLE
app.get("/api/getProjectsInctives", (req, res) => {
  getProjectsInctives(req, res);
});

// 6. GET PROJECTS BY DELIVERY DATE FROM PROJECTS TABLE
app.get("/api/getProjectsByDeliveryDate", (req, res) => {
  getProjectsByDeliveryDate(req, res);
});

// 7. POST NEW PROJECT TO PROJECTS TABLE
app.post("/api/postProject", (req, res) => {
  postProject(req, res);
});

// 8. PATCH PROJECT BY ID FROM PROJECTS TABLE
app.patch("/api/patchProject/:id", (req, res) => {
  patchProjectByID(req, res);
});

// 9. PUT PROJECT BY ID FROM PROJECTS TABLE
app.put("/api/putProject/:id", (req, res) => {
  putProjectByID(req, res);
});

// 10. DELETE PROJECT BY ID FROM PROJECTS TABLE
app.delete("/api/deleteProject/:id", (req, res) => {
  deleteProjectByID(req, res);
});

///////////////////////////////////////////////////////////////// ASSEMBLY TABLE

// 1. GET ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.get("/api/getAssambly/:id", (req, res) => {
  getAssamblyByID(req, res);
});

// 2. GET ASSEMBLY BY DELIVERY DATE FROM ASSEMBLY TABLE
app.get("/api/getAssemblyByDeliveryDate", (req, res) => {
  getAssemblyByDeliveryDate(req, res);
});

// 3. GET ASSEMBLY BY COMPLETED DATE FROM ASSEMBLY TABLE
app.get("/api/getAssemblyByCompletedDate", (req, res) => {
  getAssemblyByCompletedDate(req, res);
});

// 4. POST NEW ASSEMBLY TO ASSEMBLY TABLE
app.post("/api/postAssembly", (req, res) => {
  postAssembly(req, res);
});

// 5. PATCH ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.patch("/api/patchAssembly/:id", (req, res) => {
  patchAssemblyByID(req, res);
});

// 6. PUT ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.put("/api/putAssembly/:id", (req, res) => {
  putAssemblyByID(req, res);
});

// 7. DELETE ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.delete("/api/deleteAssembly/:id", (req, res) => {
  deleteAssemblyByID(req, res);
});

// 8. GET ASSEMBLY BY PROJECT FK FROM ASSEMBLY TABLE
app.get("/api/assembly/project/:id", (req, res) => {
  getAssemblyByProjectFK(req, res);
});

///////////////////////////////////////////////////////////////// BOM TABLE

// 1. GET BOM BY ID FROM BOM TABLE
app.get("/api/items/:projectId", async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId, 10);
    const items = await getItemsByProject(projectId);
    res.json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los items", error: error.message });
  }
});

// 2 ONLY ITEMS THAT NOT TO BE IN STOCK
app.get("/api/items/stock/assembly/:id", async (req, res) => {
  try {
    const assemblyId = req.params.id;
    const items = await getItemsByAssemblyWithZeroQuantity(assemblyId);
    res.json(items);
  } catch (error) {
    console.error("Items Sin Stock:", error);
    res.status(500).json([]); // Devuelve un array vacío en caso de error
  }
});

///////////////////////////////////////////////////////////////// ITEMS TABLE

// 1. GET ALL ITEMS FOR TESTING PURPOSES
app.get("/api/getItems", (req, res) => {
  getAllItems(req, res);
});

// 2. GET ITEMS BY STOCK FROM ITEMS TABLE
app.get("/api/getItemsInStock", (req, res) => {
  getItemsInStock(req, res);
});

// 3. GET ITEMS BY ARRIVED DATE FROM ITEMS TABLE
app.get("/api/getItemsByArrivedDate", (req, res) => {
  getItemsByArrivedDate(req, res);
});

// 4. GET ITEMS BY DATE ORDER FROM ITEMS TABLE
app.get("/api/getItemsByDateOrder", (req, res) => {
  getItemsByDateOrder(req, res);
});

// 5. POST NEW ITEM TO ITEMS TABLE
app.post("/api/postItem", (req, res) => {
  postItem(req, res);
});

// 6. PATCH ITEM BY ID FROM ITEMS TABLE
app.patch("/api/patchItem/:id", (req, res) => {
  patchItemByID(req, res);
});

// 7. PUT ITEM BY ID FROM ITEMS TABLE
app.put("/api/putItem/:id", (req, res) => {
  putItemByID(req, res);
});

// 8. DELETE ITEM BY ID FROM ITEMS TABLE
app.delete("/api/deleteItem/:id", (req, res) => {
  deleteItemByID(req, res);
});

// 9. GET ITEMS BY PROJECT FK FROM ITEMS TABLE AND PROJECT TABLE JOIN
app.get("/api/getItems/project/:id", (req, res) => {
  getItemsByProjectFK(req, res);
});

// 10. GET ITEMS BY ASSEMBLY AND PROJECT FK FROM ITEMS TABLE, ASSEMBLY TABLE AND PROJECTS TABLE JOIN
app.get("/api/getItems/assembly/:project_id/:assembly_id", (req, res) => {
  getItemsByAssemblyProjectFK(req, res);
});

// 11. GET ITEMS WITH PRICE NUMBER
app.get("/api/items/price/:number_price", (req, res) => {
  getItemsByNumberPrice(req, res);
});

/////////////////////////////////////////////////////////////////// START SERVER

const port = process.env.PORT || 3000; // use the port defined in the environment variables or 3000
app.listen(port, () => console.log(`Server listening on port ${port}`)); // start the server and listen on port

module.exports = app; // Export the app for testing
