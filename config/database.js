const { Sequelize } = require("sequelize");  // Export a Sequelize instance and models
const config = require('./config.json').development;  

// Replace the connection string with your database configuration
const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect,
  host: config.host, // Replace with your database host if different
  port: config.port
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const db = {};  // Create a database object

// Add Sequelize instance to the database object
db.sequelize = sequelize; // Export Sequelize instance
db.Sequelize = Sequelize; // Export Sequelize library

// Import models
db.user_type = require("../models/user_type.model.js")(sequelize, Sequelize);
db.users = require("../models/users.model.js")(sequelize, Sequelize);
db.users_projects = require("../models/users_projects.model.js")(sequelize, Sequelize);
db.projects = require("../models/projects.model.js")(sequelize, Sequelize);
db.assembly = require("../models/assembly.model.js")(sequelize, Sequelize);
db.subassembly = require("../models/subassembly.model.js")(sequelize, Sequelize);
db.items = require("../models/items.model.js")(sequelize, Sequelize);
db.stock = require("../models/stock.model.js")(sequelize, Sequelize);
db.stock_items = require("../models/stock_items.model.js")(sequelize, Sequelize);
db.bom = require("../models/bom.model.js")(sequelize, Sequelize);

// Foreign keys relationships
db.users.belongsTo(db.user_type, { foreignKey: "user_type_id" });
db.users_projects.belongsTo(db.users, { foreignKey: "users_id" });
db.users_projects.belongsTo(db.projects, { foreignKey: "project_id" });
db.assembly.belongsTo(db.projects, { foreignKey: "project_id" });
db.subassembly.belongsTo(db.assembly, { foreignKey: "assembly_id" });
db.items.belongsTo(db.projects, { foreignKey: "project_id" });
db.items.belongsTo(db.assembly, { foreignKey: "assembly_id" });
db.items.belongsTo(db.subassembly, { foreignKey: "subassembly_id" });
db.stock_items.belongsTo(db.items, { foreignKey: "item_id" });
db.stock_items.belongsTo(db.stock, { foreignKey: "stock_id" });
db.bom.belongsTo(db.projects, { foreignKey: "project_id" });
db.bom.belongsTo(db.assembly, { foreignKey: "assembly_id" });
db.bom.belongsTo(db.items, { foreignKey: "item_id" });
db.bom.belongsTo(db.stock_items, { foreignKey: "stock_items_id" });

db.items.hasMany(db.stock_items, { foreignKey: "item_id" });
db.users.hasMany(db.users_projects, { foreignKey: 'users_id' });
db.projects.hasMany(db.users_projects, { foreignKey: 'project_id' });
db.users_projects.belongsTo(db.projects, { foreignKey: 'project_id' });
db.users.hasMany(db.users_projects, { foreignKey: "users_id" });
db.projects.hasMany(db.users_projects, { foreignKey: "project_id" });

module.exports = db;  // Export db
