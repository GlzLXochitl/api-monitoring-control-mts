# MMC - Sistema de Monitoreo y Control de Materiales

## Descripción del Repositorio

Este repositorio contiene la API del Sistema de Monitoreo y Control de Materiales (MMC). La API está diseñada para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los materiales y proyectos. Sirve como el núcleo de la gestión de datos dentro del sistema, proporcionando los endpoints necesarios para interactuar con la base de datos y mantener la integridad de la información.

## Descripción del Proyecto 

El Sistema de Monitoreo y Control de Materiales (MMC) es un proyecto más amplio compuesto por esta API y otro componente, llamado "Proyecto2", que se encarga de la interfaz de usuario, la sincronización de datos, entre otras funciones. Juntos, estos dos repositorios conforman una aplicación completa que permite gestionar y monitorear materiales con seguimiento de proyectos, facilitando una administración eficiente de recursos a través de una interfaz de usuario y una infraestructura de backend.

[Repositorio de Proyecto2](https://example.com)

## Dependencias

El proyecto utiliza las siguientes dependencias:

- `express`: Framework web para Node.js.
- `body-parser`: Middleware para analizar cuerpos de solicitudes HTTP.
- `cors`: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- `mariadb`: Cliente para conectarse a bases de datos MariaDB.
- `sequelize`: ORM (Object-Relational Mapping) para Node.js.
- `nodemon`: Herramienta para reiniciar automáticamente la aplicación cuando se detectan cambios en los archivos.

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1. Clona el repositorio:

   ```sh
   git clone https://github.com/GlzLXochitl/api-monitoring-control-mts.git
   cd api-monitoring-control-mts
   ```

2. Instala las dependencias del proyecto:

   ```sh
   npm install
   ```

3. Configura la base de datos:

   - Crea una base de datos en MariaDB.
   - Actualiza el archivo `config/database.js` con las credenciales de tu base de datos.

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

4. Ejecuta las semillas para configurar la base de datos:

   ```sh
   # Ejecutar todas las semillas
   npx sequelize-cli db:seed:all
   ```

   Si necesitas revertir las semillas, puedes hacerlo con el siguiente comando:

   ```sh
   npx sequelize-cli db:seed:undo
   ```

5. Inicia el servidor en modo desarrollo:

   ```sh
   npm run dev
   ```

   Esto iniciará el servidor utilizando `nodemon`, que reiniciará automáticamente la aplicación cuando se detecten cambios en los archivos.

## Uso

Una vez que el servidor esté en funcionamiento, puedes acceder a la aplicación en `http://localhost:3000` (o el puerto que hayas configurado).
