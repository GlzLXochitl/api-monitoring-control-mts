# MMC - Sistema de Monitoreo y Control de Materiales

## Descripción del Proyecto

El Sistema de Monitoreo y Control de Materiales (MMC) es una aplicación diseñada para gestionar y monitorear materiales con seguimiento de proyectos. Proporciona una interfaz para registrar, actualizar y consultar información sobre materiales y proyectos, facilitando la gestión eficiente de recursos.

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
    const { Sequelize } = require('sequelize');

    const sequelize = new Sequelize('nombre_base_datos', 'usuario', 'contraseña', {
      host: 'localhost',
      dialect: 'mariadb',
      logging: false,
    });

    module.exports = sequelize;
    ```

//4. Ejecuta las migraciones y semillas (si las hay) para configurar la base de datos.

5. Inicia el servidor en modo desarrollo:

    ```sh
    npm run dev
    ```

    Esto iniciará el servidor utilizando `nodemon`, que reiniciará automáticamente la aplicación cuando se detecten cambios en los archivos.

## Uso

Una vez que el servidor esté en funcionamiento, puedes acceder a la aplicación en `http://localhost:3000` (o el puerto que hayas configurado).

