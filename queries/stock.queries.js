// Importar la conexión a la base de datos
const db = require("../config/database");

// Nombres de las tablas
const Stock = db.stock;
const Items = db.items;
const Stock_items = db.stock_items;


const getItemsWithStock = async () => {
    try {
        const itemsWithStock = await db.items.findAll({
            include: [
                {
                    model: db.stock_items,
                    required: true, // Esto asegura que solo se traigan los items que tienen stock
                    include: [
                        {
                            model: db.stock, // Incluir la tabla stock
                            required: true, // Opcional: solo incluir si hay stock relacionado
                        },
                    ],
                },
            ],
        });
        return itemsWithStock;
    } catch (error) {
        throw new Error('Error al obtener items con stock: ' + error.message);
    }
};



  module.exports = {
    getItemsWithStock}