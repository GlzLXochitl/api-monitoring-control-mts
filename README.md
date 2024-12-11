# MMC - Materials Monitoring and Control System

## Repository Description

This repository contains the API of the Materials Monitoring and Control System (MMC). The API is designed to perform CRUD (Create, Read, Update, Delete) operations on materials and projects. It serves as the core of data management within the system, providing the necessary endpoints to interact with the database and maintain information integrity.

## Project Description 

The Materials Monitoring and Control System (MMC) is a broader project composed of this API and another component, called "MMC-SYSTEM-PX", which is responsible for the user interface, data synchronization, among other functions. Together, these two repositories form a complete application that allows managing and monitoring materials with project tracking, facilitating efficient resource management through a user interface and a backend infrastructure.

Repository link: ["MMC-SYSTEM-PX"](https://github.com/pacodelarosajza/MMC-SYSTEM-PX.git)

## Dependencies

The project uses the following dependencies:

- `express`: Web framework for Node.js.
- `body-parser`: Middleware to analyze HTTP request bodies.
- `cors`: Middleware to enable CORS (Cross-Origin Resource Sharing).
- `mariadb`: Client to connect to MariaDB databases.
- `sequelize`: ORM (Object-Relational Mapping) for Node.js.
- `nodemon`: Tool to automatically restart the application when file changes are detected.
- `mysql`: Client to connect to MySQL databases.

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

   - Create a database by running the script `db_yaskawa_MMC.sql` located in the `database` folder.
   - Update the `config/config.json` file with your database credentials.

   ```json
   {
     "development": {
       "username": "username",
       "password": "password",
       "database": "name_database",
       "host": "localhost",
       "dialect": "mariadb",
       "port": "port"
     }
   }
   ```

4. Set up environment variables:

   - Create a `.env` file in the root directory of the project.
   - Add the `CLIENT_IP_ADDRESS` variable to the `.env` file with the IP address of the client that will make requests to the database.

   ```env
   CLIENT_IP_ADDRESS=your_client_ip_address
   ```

5. Execute the seeds to configure the database:

   ```sh
   # Execute all seeds
   npx sequelize-cli db:seed:all
   ```

6. Start the server in development mode:

   ```sh
   npm run dev
   ```

   This will start the server using `nodemon`, which will automatically restart the application when changes to the files are detected.

## Use

Once the server is up and running, you can access the application at `http://localhost:3002` (or whatever port you have configured).
