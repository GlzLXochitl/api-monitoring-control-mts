// Export a Sequelize instance and models
const { Sequelize } = require('sequelize');

// Replace the connection string with your database configuration
const sequelize = new Sequelize(
  "mmc", 
  "root", 
  "root", 
  {
  dialect: "mysql",
  host: "localhost", // Replace with your database host if different
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Create a database object
const db = {};

// Add Sequelize instance to the database object
db.sequelize = sequelize; //acceso a la libreria
db.sequelize = Sequelize; //acceso a la instancia

//Models/tables
db.user_type = require("../models/user_type.model.js")(sequelize, Sequelize); 
db.assembly = require("../models/assembly.model.js")(sequelize, Sequelize); 
db.items = require("../models/items.model.js")(sequelize, Sequelize); 
db.bom = require("../models/bom.model.js")(sequelize, Sequelize); 
db.users = require("../models/users.model.js")(sequelize, Sequelize); 
db.users_projects = require("../models/users_projects.model.js")(sequelize, Sequelize); 
db.projects = require("../models/projects.model.js")(sequelize, Sequelize); 
db.price_number = require("../models/price_number.model.js")(sequelize, Sequelize); 
//foreign keys
db.users.belongsTo(db.user_type, { foreignKey: "user_type_id" });
db.users_projects.belongsTo(db.users, { foreignKey: "users_id" });
db.users_projects.belongsTo(db.projects, { foreignKey: "project_id" });
db.assembly.belongsTo(db.projects, { foreignKey: "project_id" });
db.items.belongsTo(db.projects, { foreignKey: "project_id" });
db.items.belongsTo(db.assembly, { foreignKey: "assembly_id" });
db.items.belongsTo(db.price_number, { foreignKey: "part_number_id" });
db.bom.belongsTo(db.projects, { foreignKey: "project_id" });
db.bom.belongsTo(db.items, { foreignKey: "item_id" });

//export db
module.exports = db;
