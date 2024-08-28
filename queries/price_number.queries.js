// post new *
// get by id *
// patch by id *

const db = require("../config/database"); // Import the database models

const PriceNumber = db.price_number; // Alias for the priceNumbers model

const postPriceNumber = async (req, res) => {
    try {
        const { number_price_item, supplier } = req.body;
        const priceNumber = await PriceNumber.create({ number_price_item, supplier });
        res.json(priceNumber);
    } catch (error) {
        console.error("Error al crear el numero de cotización:", error);
        res.status(500).send("Error del servidor");
    }
};

const getPriceNumberById = async (req, res) => {
    try {
        const { id } = req.params;
        const priceNumber = await PriceNumber.findByPk(id);
        if (priceNumber) {
        res.json(priceNumber);
        } else {
        res.status(404).send("Numero de cotización no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el numero de cotización:", error);
        res.status(500).send("Error del servidor");
    }
};

const patchPriceNumberById = async (req, res) => {
    try {
        const { id } = req.params;
        const { number_price_item, supplier } = req.body;
        const priceNumber = await PriceNumber.findByPk(id);
        if (priceNumber) {
        priceNumber.number_price_item = number_price_item;
        priceNumber.supplier = supplier;
        await priceNumber.save();
        res.json(priceNumber);
        } else {
        res.status(404).send("Numero de cotización no encontrado");
        }
    } catch (error) {
        console.error("Error al actualizar el numero de cotización:", error);
        res.status(500).send("Error del servidor");
    }
};

module.exports = {
    postPriceNumber, 
    getPriceNumberById, 
    patchPriceNumberById,
};

