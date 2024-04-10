const Provider = require('../models/provider.model');

// CREATE
const createProvider = async (req, res) => {
    console.log(req.body);

    try {
        const data = req.body;
        let answer = await new Provider(data).save();
        res.status(201).json(answer);

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// READ
const getProvider = async (req, res) => {
    try {
        const id = req.params.id;
        let providers = id ? await Provider.find({ id }, '-_id -__v') : await Provider.find({}, '-_id -__v'); //{}
        res.status(200).json(providers); // Respuesta de la API para 1 proveedor
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// UPATE
const editProvider = async (req, res) => {
    try {
        const proveedor = req.params.company;
        const newData = req.body;
        /* let answer = await Provider.updateOne({ company }, newData) */
        let answer = await Provider.updateOne({ company: { $eq: proveedor } }, { $set: { newData } })
        res.status(200).json(answer);
        res.status(200).send("Proveedor editado!");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// DELETE
const deleteProvider = async (req, res) => {
    //Deberiamos consultar antes si hay productos relacionados con este proveedor antes de borrarlo
    try {
        const proveedor = req.params.company;
        /* let answer = await Provider.updateOne({ company }, newData) */
        let answer = await Provider.deleteOne({ company: { $eq: proveedor } })
        res.status(200).json(answer);
        res.status(200).send("Provider borrado!. Has borrado:" + req.params.id);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

module.exports = {
    createProvider,
    getProvider,
    editProvider,
    deleteProvider,
}