# MMC - Materials Monitoring and Control System

## Repository Description

This repository contains the API of the Materials Monitoring and Control System (MMC). The API is designed to perform CRUD (Create, Read, Update, Delete) operations on materials and projects. It serves as the core of data management within the system, providing the necessary endpoints to interact with the database and maintain information integrity.

## Project Description 

The Materials Monitoring and Control System (MMC) is a broader project composed of this API and another component, called "react-monitoring-control-mts", which is responsible for the user interface, data synchronization, among other functions. Together, these two repositories form a complete application that allows managing and monitoring materials with project tracking, facilitating efficient resource management through a user interface and a backend infrastructure.

[Repository of "react-monitoring-control-mts": ](https://github.com/GlzLXochitl/react-monitoring-control-mts.git)

## Dependencies

The project uses the following dependencies:

- `express`: Web framework for Node.js.
- `body-parser`: Middleware to analyze HTTP request bodies.
- `cors`: Middleware to enable CORS (Cross-Origin Resource Sharing).
- `mariadb`: Client to connect to MariaDB databases.
- `sequelize`: ORM (Object-Relational Mapping) for Node.js.
- `nodemon`: Tool to automatically restart the application when file changes are detected.

## Installation

Follow these steps to set up and run the project in your local environment:

1. Clone the repository:

   ```sh
   git clone https://github.com/GlzLXochitl/api-monitoring-control-mts.git
   cd api-monitoring-control-mts
   ```

2. Installs the project dependencies:

   ```sh
   npm install
   ```

3. Configure the database:

   - Create a database in MariaDB.
   - Update the `config/database.js` file with your database credentials.

   ```javascript

   const sequelize = new Sequelize(
     "nombre_base_datos",
     "usuario",
     "contraseña",
     {
        dialect: "mariadb",
        host: "localhost",
     }
   );

   ```

4. Execute the seeds to configure the database:

   ```sh
   # Execute all seeds
   npx sequelize-cli db:seed:all
   ```

   If you need to revert the seeds, you can do it with the following command:

   ```sh
   npx sequelize-cli db:seed:undo
   ```

5. Start the server in development mode:

   ```sh
   npm run dev
   ```

   This will start the server using `nodemon`, which will automatically restart the application when changes to the files are detected.

## Use

Once the server is up and running, you can access the application at `http://localhost:3000` (or whatever port you have configured).
