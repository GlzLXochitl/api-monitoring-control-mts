const express = require("express"); // importt the express library
const app = express(); // create an instance of express

const bodyParser = require("body-parser"); // import the body-parser library
app.use(bodyParser.json()); // use the body-parser middleware

const cors = require("cors"); // import the cors library
app.use(cors()); //use the cors middleware to enable cross-origin resource sharing

const { getAllUserTypes } = require("./queries/user_type.queries");
const {
  removeSpecificProjectForUser,
  removeAllProjectsForUser,
  getUsersProjects,
  getUsersByProject,
  getAdminsByProject,
  assignUserToProject,
} = require("./queries/users_projects.queries");
const {
  getAllUsers,
  getUserByEmail,
  getUserByUserNumber,
  postUser,
  patchUserById,
  putUserById,
  deleteUserByIdPatch, // logic delete
  getUsersByUserType,
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
  getAssamblyByID,
  getAssemblyByDeliveryDate,
  getAssemblyByCompletedDate,
  postAssembly,
  patchAssemblyByID,
  putAssemblyByID,
  deleteAssemblyByID,
  getAssemblyByProjectFK,
  getAssemblyArrived,
  getAssemblyMissing,
} = require("./queries/assembly.queries");
const {
  getItemsByProject,
  getBomByAssemblyWithItemsMissing,
  getItemsByAssemblyAndProject,
} = require("./queries/bom.queries");
const {
  getAllItems, // only for testing
  getItemsByArrivedDate,
  getItemsByDateOrder,
  postItem,
  patchItemByID,
  putItemByID,
  deleteItemByID,
  getItemsByProjectFK,
  getItemsByAssemblyProjectFK,
  getItemsByNumberPrice, //Quotation number
  getItemsArrived,
  getItemsMissing,
} = require("./queries/items.queries");
const {
  getAllStockk,
  getStockByID,
  postStock,
  patchStockByID,
  putStockByID,
  deleteStockByID,
  getStockByName,
} = require("./queries/stock.queries");

///////////////////////////////////////////////////////////////// TEST ENDPOINT

// TEST ROUTE TO CHECK IF THE SERVER IS RUNNING
app.get("/api/test", (req, res) => {
  res.send("Successfully connected to the server");
});

///////////////////////////////////////////////////////////////// USER_TYPES TABLE

// GET ALL USER TYPES FROM USER_TYPES TABLE
app.get("/api/getUserTypes", (req, res) => {
  getAllUserTypes(req, res);
});

////////////////////////////////////////////////////////////////// USER_PROYECTS TABLE

// Middleware para manejar errores asíncronos
/*const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};*/
// DELETE PROJECTS FOR A SPECIFIC USER
app.delete("/usuarios/:userId/proyectos/:projectId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const projectId = parseInt(req.params.projectId, 10);
    const resultado = await removeSpecificProjectForUser(userId, projectId);
    res.json({
      mensaje: `Project with ID was deleted ${projectId} for user with ID ${userId}`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error deleting project for user",
      error: error.message,
    });
  }
});
// DELETE ALL PROJECTS FOR USER
app.delete("/api/usuarios/:userId/proyectos", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const resultado = await removeAllProjectsForUser(userId);
    res.json({
      mensaje: `They were removed ${resultado} project associations for user with ID ${userId}`,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error deleting all project associations for user",
      error: error.message,
    });
  }
});
/// GET USERS WITH PROYECTS ASOCIATED
app.get("/api/users-projects", async (req, res) => {
  try {
    const usersProjects = await getUsersProjects();
    res.json(usersProjects);
  } catch (error) {
    res.status(500).json({ message: "Error getting users and projects" });
  }
});
// USERS FROM ASOCIATED PROYECT IN SPECIFIC
app.get("/api/projects/:project_id/users", async (req, res) => {
  try {
    const project_id = req.params.project_id; // project_id BY URL
    const users = await getUsersByProject(project_id);

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).send("No users found for this project");
    }
  } catch (error) {
    console.error("Error getting project users:", error);
    res.status(500).send("Server error");
  }
});
// GET USERS BY PROJECT AND WHO ARE ADMINS
app.get("/api/projects/:project_id/admins", async (req, res) => {
  try {
    const project_id = req.params.project_id;
    const admins = await getAdminsByProject(project_id);

    if (admins.length > 0) {
      res.json(admins);
    } else {
      res.status(404).send("No administrators found for this project");
    }
  } catch (error) {
    console.error("Error getting project administrators:", error);
    res.status(500).send("Server error");
  }
});
// POST, CREATE A NEW USER IN A PROJECT -> ONLY FOR TESTING
app.post("/api/user_assign_project", async (req, res) => {
  assignUserToProject(req, res);
});

///////////////////////////////////////////////////////////////// USERS TABLE

// GET ALL USERS FROM USERS
app.get("/api/getUsers", (req, res) => {
  getAllUsers(req, res);
});
// GET USER BY EMAIL FROM USERS
app.get("/api/users/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error when obtaining the user by email:", error);
    res.status(500).send("Server error");
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
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error getting user by usernumber:", error);
    res.status(500).send("Server error");
  }
});
// PATCH USER BY ID FROM USERS
app.patch("/api/users/:id", (req, res) => {
  patchUserById(req, res);
});
// POST A NEW USER IN USERS
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
    const user_type_id = parseInt(req.params.id, 10); // Convert parameter to integer
    if (isNaN(user_type_id) || user_type_id <= 0) {
      return res.status(400).send("ID inválido");
    }
    // Call the function to get users by user type
    const users = await getUsersByUserType(user_type_id);
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).send("No users found with the given user type");
    }
  } catch (error) {
    console.error("Error getting users by user type:", error);
    res.status(500).send("Server error");
  }
});

///////////////////////////////////////////////////////////////// PROJECTS TABLE

// GET ALL PROJECTS FROM PROJECTS TABLE -> ONLY FOR TESTING
app.get("/api/getProjects", (req, res) => {
  getAllProjects(req, res);
});
// GET PROJECT BY IDENTIFICATION NUMBER FROM PROJECTS TABLE
app.get("/api/getProjects/identification_number/:number_id", (req, res) => {
  getProjectByIdentificationNumber(req, res);
});
// GET PROJECT BY ID FROM PROJECTS TABLE
app.get("/api/getProjects/id/:id", (req, res) => {
  getProjectByID(req, res);
});
// GET ACTIVE PROJECTS FROM PROJECTS TABLE
app.get("/api/getProjectsActives", (req, res) => {
  getProjectsActives(req, res);
});
// GET INACTIVE PROJECTS FROM PROJECTS TABLE
app.get("/api/getProjectsInctives", (req, res) => {
  getProjectsInctives(req, res);
});
// GET PROJECTS BY DELIVERY DATE FROM PROJECTS TABLE
app.get("/api/getProjectsByDeliveryDate", (req, res) => {
  getProjectsByDeliveryDate(req, res);
});
// POST NEW PROJECT TO PROJECTS TABLE
app.post("/api/postProject", (req, res) => {
  postProject(req, res);
});
// PATCH PROJECT BY ID FROM PROJECTS TABLE
app.patch("/api/patchProject/:id", (req, res) => {
  patchProjectByID(req, res);
});
// PUT PROJECT BY ID FROM PROJECTS TABLE
app.put("/api/putProject/:id", (req, res) => {
  putProjectByID(req, res);
});
// DELETE PROJECT BY ID FROM PROJECTS TABLE
app.delete("/api/deleteProject/:id", (req, res) => {
  deleteProjectByID(req, res);
});

///////////////////////////////////////////////////////////////// ASSEMBLY TABLE

// GET ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.get("/api/getAssambly/:id", (req, res) => {
  getAssamblyByID(req, res);
});
// GET ASSEMBLY BY DELIVERY DATE FROM ASSEMBLY TABLE
app.get("/api/getAssemblyByDeliveryDate", (req, res) => {
  getAssemblyByDeliveryDate(req, res);
});
// GET ASSEMBLY BY COMPLETED DATE FROM ASSEMBLY TABLE
app.get("/api/getAssemblyByCompletedDate", (req, res) => {
  getAssemblyByCompletedDate(req, res);
});
// POST NEW ASSEMBLY TO ASSEMBLY TABLE
app.post("/api/postAssembly", (req, res) => {
  postAssembly(req, res);
});
// PATCH ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.patch("/api/patchAssembly/:id", (req, res) => {
  patchAssemblyByID(req, res);
});
// PUT ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.put("/api/putAssembly/:id", (req, res) => {
  putAssemblyByID(req, res);
});
// DELETE ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.delete("/api/deleteAssembly/:id", (req, res) => {
  deleteAssemblyByID(req, res);
});
// GET ASSEMBLY BY PROJECT FK FROM ASSEMBLY TABLE
app.get("/api/assembly/project/:id", (req, res) => {
  getAssemblyByProjectFK(req, res);
});
// GET ONLY ASSEMBLY IF ARRIVED
app.get("/api/getAssembly/arrived", (req, res) => {
  getAssemblyArrived(req, res);
});
// GET ONLY ASSEMBLY IF MISSING
app.get("/api/getAssembly/missing", (req, res) => {
  getAssemblyMissing(req, res);
});

///////////////////////////////////////////////////////////////// BOM TABLE

// GET BOM BY ID FROM BOM TABLE
app.get("/api/items/:projectId", async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId, 10);
    const items = await getItemsByProject(projectId);
    res.json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting items", error: error.message });
  }
});
// ONLY ITEMS THAT NOT TO BE IN STOCK
app.get("/api/items/bomByAssembly/:id", async (req, res) => {
  try {
    const assemblyId = req.params.id;
    const items = await getBomByAssemblyWithItemsMissing(assemblyId);
    res.json(items);
  } catch (error) {
    console.error("Items not Stock:", error);
    res.status(500).json([]); // Returns an empty array on error
  }
});
// GET ITEMS BY PROJECT BY ASSEMBLY
app.get("/projects/:projectId/assemblies/:assemblyId/items", (req, res) => {
  getItemsByAssemblyAndProject(req, res);
});
// GET BY USER NAME
app.get("/api/users/name/:name", (req, res) => {
  getStockByName(req, res);
});


///////////////////////////////////////////////////////////////// ITEMS TABLE

// GET ALL ITEMS FOR TESTING PURPOSES
app.get("/api/getItems", (req, res) => {
  getAllItems(req, res);
});
// GET ITEMS BY ARRIVED DATE FROM ITEMS TABLE
app.get("/api/getItemsByArrivedDate", (req, res) => {
  getItemsByArrivedDate(req, res);
});
// GET ITEMS BY DATE ORDER FROM ITEMS TABLE
app.get("/api/getItemsByDateOrder", (req, res) => {
  getItemsByDateOrder(req, res);
});
// POST NEW ITEM TO ITEMS TABLE
app.post("/api/postItem", (req, res) => {
  postItem(req, res);
});
// PATCH ITEM BY ID FROM ITEMS TABLE
app.patch("/api/patchItem/:id", (req, res) => {
  patchItemByID(req, res);
});
// PUT ITEM BY ID FROM ITEMS TABLE
app.put("/api/putItem/:id", (req, res) => {
  putItemByID(req, res);
});
// DELETE ITEM BY ID FROM ITEMS TABLE
app.delete("/api/deleteItem/:id", (req, res) => {
  deleteItemByID(req, res);
});
// GET ITEMS BY PROJECT FK FROM ITEMS TABLE AND PROJECT TABLE JOIN
app.get("/api/getItems/project/:id", (req, res) => {
  getItemsByProjectFK(req, res);
});
// GET ITEMS BY ASSEMBLY AND PROJECT FK FROM ITEMS TABLE, ASSEMBLY TABLE AND PROJECTS TABLE JOIN
app.get(
  "/api/getItems/project/assembly/:project_id/:assembly_id",
  (req, res) => {
    getItemsByAssemblyProjectFK(req, res);
  }
);
// GET ITEMS WITH PRICE NUMBER
app.get("/api/items/price/:number_price", (req, res) => {
  getItemsByNumberPrice(req, res);
});
// GET ONLY ITEMS IF ARRIVED
app.get("/api/getItems/arrived", (req, res) => {
  getItemsArrived(req, res);
});
// GET ONLY ITEMS IF MISSING
app.get("/api/getItems/missing", (req, res) => {
  getItemsMissing(req, res);
});

/////////////////////////////////////////////////////////////////// STOCK TABLE

// GET ITEMS BY STOCK
app.get("/api/getAllStockk", (req, res) => {
  getAllStockk(req, res);
});
// GET STOCK BY ID
app.get("/api/getStock/:id", (req, res) => {
  getStockByID(req, res);
});
// CREATE A NEW STOCK RECORD
app.post("/api/postStock", (req, res) => {
  postStock(req, res);
});
// PARTIALLY UPDATE A STOCK RECORD BY ID
app.patch("/api/patchStock/:id", (req, res) => {
  patchStockByID(req, res);
});
// COMPLETELY UPDATE A STOCK RECORD BY ID
app.put("/api/putStock/:id", (req, res) => {
  putStockByID(req, res);
});
// DELETE A STOCK RECORD BY ID
app.delete("/api/deleteStock/:id", (req, res) => {
  deleteStockByID(req, res);
});

/////////////////////////////////////////////////////////////////// START SERVER

//.IP_ADDRESS 
const port = process.env.PORT || 3000; // use the port defined in the environment variables or 3000
app.listen(port, () => console.log(`Server listening on port ${port}`)); // start the server and listen on port

module.exports = app; // Export the app for testing
