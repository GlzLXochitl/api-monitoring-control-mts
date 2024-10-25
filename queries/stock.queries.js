// Importar la conexión a la base de datos
const db = require("../config/database");
const StockItems = db.stock_items; // Asegúrate de que esto esté en la parte superior del archivo

// Nombres de las tablas
const Stock = db.stock;
const Items = db.items;



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


const createItemWithStock = async (req, res) => {
    // Desestructuración de datos del cuerpo de la solicitud
    const {
        project_id,
        assembly_id,
        name,
        description,
        project_assignment_quantity,
        price,
        currency,
        arrived_date,
        date_order,
        in_assembly,
        number_material,
        number_cotizacion,
        supplier,
        stock_quantity,
    } = req.body;

    try {
        // Crear nuevo stock
        const newStock = await Stock.create({
            stock_quantity,
        });

        // Crear nuevo item
        const newItem = await Items.create({
            project_id,
            assembly_id,
            name,
            description,
            project_assignment_quantity,
            price,
            currency,
            arrived_date,
            date_order,
            in_assembly,
            number_material,
            number_cotizacion,
            supplier,
        });

        // Relacionar el item con el stock
        await StockItems.create({ // Asegúrate de que esto esté usando el nombre correcto
            item_id: newItem.id,
            stock_id: newStock.id,
        });

        return res.status(201).json({
            message: 'Item creado exitosamente',
            item: newItem,
            stock: newStock,
        });
    } catch (error) {
        console.error('Error al crear el item y stock:', error);
        return res.status(500).json({
            message: 'Error al crear el item y stock',
            error: error.message,
        });
    }
};


const updateItemWithStock = async (req, res) => {
    const {
        item_id, // ID del item a modificar
        project_id,
        assembly_id,
        name,
        description,
        project_assignment_quantity,
        price,
        currency,
        arrived_date,
        date_order,
        in_assembly,
        number_material,
        number_cotizacion,
        supplier,
        stock_quantity, // Cantidad de stock nueva
    } = req.body;

    try {
        // Buscar el item por su ID
        const item = await Items.findByPk(item_id);
        if (!item) {
            return res.status(404).json({
                message: 'Item no encontrado',
            });
        }

        // Actualizar los datos del item
        await item.update({
            project_id,
            assembly_id,
            name,
            description,
            project_assignment_quantity,
            price,
            currency,
            arrived_date,
            date_order,
            in_assembly,
            number_material,
            number_cotizacion,
            supplier,
        });

        // Buscar el stock asociado al item
        const stockItem = await StockItems.findOne({
            where: { item_id: item_id }
        });
        if (!stockItem) {
            return res.status(404).json({
                message: 'Stock no encontrado para el item',
            });
        }

        // Actualizar la cantidad de stock
        await stockItem.update({
            stock_quantity: stock_quantity,
        });

        return res.status(200).json({
            message: 'Item y stock actualizados exitosamente',
            item: item,
            stock: stockItem,
        });
    } catch (error) {
        console.error('Error al actualizar el item y stock:', error);
        return res.status(500).json({
            message: 'Error al actualizar el item y stock',
            error: error.message,
        });
    }
};
  
// stock.queries.js
const updateStockByItemName = async (req, res) => {
    const { itemName, stock_quantity } = req.body; // Recibe el nombre del ítem y la nueva cantidad

    try {
        // Buscar el item por su nombre
        const item = await Items.findOne({
            where: { name: itemName }
        });

        if (!item) {
            return res.status(404).json({ message: 'Item no encontrado' });
        }

        // Buscar el stock relacionado con el item
        const stockItem = await StockItems.findOne({
            where: { item_id: item.id }
        });

        if (!stockItem) {
            return res.status(404).json({ message: 'Stock no encontrado para este item' });
        }

        // Actualizar la cantidad de stock
        stockItem.stock_quantity = stock_quantity; // Asignar la nueva cantidad
        await stockItem.save(); // Guardar los cambios

        return res.status(200).json({
            message: 'Stock actualizado exitosamente',
            stock: stockItem,
        });
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
        return res.status(500).json({
            message: 'Error al actualizar el stock',
            error: error.message,
        });
    }
};

const updateItemStock = async (req, res) => {
    const { stock_quantity } = req.body;
    const { itemId } = req.params;

    try {
        // Encuentra el stock relacionado con el item
        const stockItem = await StockItems.findOne({
            where: { item_id: itemId },
            include: [Stock]
        });

        if (!stockItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Actualiza la cantidad de stock
        await Stock.update(
            { stock_quantity },
            { where: { id: stockItem.stock_id } }
        );

        return res.status(200).json({ message: 'Stock updated successfully' });
    } catch (error) {
        console.error('Error updating stock:', error);
        return res.status(500).json({ message: 'Error updating stock', error: error.message });
    }
};




  module.exports = {
    getItemsWithStock,
    createItemWithStock,
    updateItemWithStock,
    updateStockByItemName,
    updateItemStock

  
}