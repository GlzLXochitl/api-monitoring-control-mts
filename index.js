/**
 * TABLES:
 * 1. assembly          XOCHITL [1 PENDIENTE]
 * 2. bom
 * 3. items
 * 4. price_number      [PENDIENTE]
 * 5. projects          [FINZALIZADA] //NOTA: LOS DATOS NECESARIOS EN PUT NO COINCIDEN CON LA BD
 * 6. user_type         [FINZALIZADA]
 * 7. users_projects
 * 8. users             PACO
 */
const { Users } = require("./models/users.model");
const express = require("express"); // Importa el módulo express
const app = express(); // Crea una instancia de una aplicación express
const router = express.Router();
const bodyParser = require("body-parser"); // Importa el middleware body-parser
app.use(bodyParser.json()); // Usa el middleware body-parser para analizar solicitudes JSON

const cors = require("cors"); // Importa el middleware cors
app.use(cors()); // Usa el middleware cors para habilitar el intercambio de recursos de origen cruzado
const {
  getAllUsers,
  getUserByEmail,
  postUser,
  patchUserById,
  putUserById,
  deleteUserById,
} = require("./queries/user.queries.js");
const { getAllUserTypes } = require("./queries/user_type.queries");
const {
  getAllProjects,
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
  getAssemblyByDeliveryDate,
  getAssemblyByCompletedDate,
  postAssembly,
  patchAssemblyByID,
  //putAssemblyByID,
  deleteAssemblyByID,
} = require("./queries/assembly.queries");

///////////////////////////////////////////////////////////////// USER_TYPES TABLE

// 1. GET ALL USER TYPES FROM USER_TYPES TABLE
app.get("/api/getUserTypes", (req, res) => {
  getAllUserTypes(req, res);
});

// Test route for the server
app.get("/api/test", (req, res) => {
  res.send("Servidor está funcionando");
});

///////////////////////////////////////////////////////////////// USERS TABLE

// GET ALL USERS FROM USERS //
app.get("/api/getusers", (req, res) => {
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

// PATCH USER BY ID FROM USERS //

app.patch("/api/users/:id", patchUserById);
app.delete("/api/users/:id", async (req, res) => {
  try {
    await deleteUserById(req, res);
  } catch (error) {
    res.status(500).send("Error en el servidor");
  }
});

// POST A NEW USER IN USERS //

///////////////////////////////////////////////////////////////// PROJECTS TABLE

// 1. GET ALL PROJECTS FROM PROJECTS TABLE
app.get("/api/getProjects", (req, res) => {
  getAllProjects(req, res);
});

// 2. GET PROJECT BY ID FROM PROJECTS TABLE
app.get("/api/getProjects/:id", (req, res) => {
  getProjectByID(req, res);
});

// 3. GET ACTIVE PROJECTS FROM PROJECTS TABLE
app.get("/api/getProjectsActives", (req, res) => {
  getProjectsActives(req, res);
});

// 4. GET INACTIVE PROJECTS FROM PROJECTS TABLE
app.get("/api/getProjectsInctives", (req, res) => {
  getProjectsInctives(req, res);
});

// 5. GET PROJECTS BY DELIVERY DATE FROM PROJECTS TABLE
app.get("/api/getProjectsByDeliveryDate", (req, res) => {
  getProjectsByDeliveryDate(req, res);
});

// 6. POST NEW PROJECT TO PROJECTS TABLE
app.post("/api/postProject", (req, res) => {
  postProject(req, res);
});

// 7. PATCH PROJECT BY ID FROM PROJECTS TABLE
app.patch("/api/patchProject/:id", (req, res) => {
  patchProjectByID(req, res);
});

// 8. PUT PROJECT BY ID FROM PROJECTS TABLE
app.put("/api/putProject/:id", (req, res) => {
  putProjectByID(req, res);
});

// 9. DELETE PROJECT BY ID FROM PROJECTS TABLE
app.delete("/api/deleteProject/:id", (req, res) => {
  deleteProjectByID(req, res);
});

///////////////////////////////////////////////////////////////// ASSEMBLY TABLE

// 1. GET ASSEMBLY BY DELIVERY DATE FROM ASSEMBLY TABLE
app.get("/api/getAssemblyByDeliveryDate", (req, res) => {
  getAssemblyByDeliveryDate(req, res);
});

// 2. GET ASSEMBLY BY COMPLETED DATE FROM ASSEMBLY TABLE
app.get("/api/getAssemblyByCompletedDate", (req, res) => {
  getAssemblyByCompletedDate(req, res);
});

// 3. POST NEW ASSEMBLY TO ASSEMBLY TABLE
app.post("/api/postAssembly", (req, res) => {
  postAssembly(req, res);
});

// 4. PATCH ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.patch("/api/patchAssembly/:id", (req, res) => {
  patchAssemblyByID(req, res);
});

// 5. PUT ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.put("/api/putAssembly/:id", (req, res) => {
  putAssemblyByID(req, res);
});

// 6. DELETE ASSEMBLY BY ID FROM ASSEMBLY TABLE
app.delete("/api/deleteAssembly/:id", (req, res) => {
  deleteAssemblyByID(req, res);
});

// Inicia el servidor
const port = process.env.PORT || 3000; // Usa la variable de entorno para el puerto o por defecto el 3000
app.listen(port, () => console.log(`Server listening on port ${port}`)); // Inicia el servidor y muestra el puerto

module.exports = app; // Exporta la aplicación
