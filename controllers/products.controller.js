const Product = require('../models/products.model');
const Provider = require('../models/provider.model');

// CREATE
const createProduct = async (req, res) => {
    /*  console.log(req.body);
     try {
         const data = req.body;
         let answer = await new Product(data).save();
         res.status(201).json(answer);
         res.status(200).send("Producto creado!");
 
     } catch (error) {
         console.log(`ERROR: ${error.stack}`);
         res.status(400).json({ msj: `ERROR: ${error.stack}` });
     } */
    try {
        let company = req.body.provider;
        const provider = await Provider.find({ company });
        console.log(provider);
        const provider_id = provider[0]._id.toString();

        const producto = new Product({
            "id": req.body.id,
            "title": req.body.title,
            "provider": provider_id,
            "price": req.body.price,
            "description": req.body.description,
            "image": req.body.image,
        });

        const result = await producto.save();
        res.status(201).json(result);
        res.status(200).send("Producto creado!");

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// READ
const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        /* let products = id ? await Product.find({ id }, '-_id -__v') : await Product.find({}, '-_id -__v'); //{} */
        let productos = await Product.find({}).populate('id');
        res.status(200).json(productos); // Respuesta de la API para 1 producto
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
    /* 
        const productos = await Product
            .find()
            // ESTO EQUIVALE A HACER UN INNER JOIN
            .populate('provider', 'company -_id')
            .select('title provider -_id');
        console.log(productos); */
}

// UPATE
const editProduct = async (req, res) => {
    try {
        const producto = req.params.id;
        const newData = req.body;
        /* let answer = await Provider.updateOne({ company }, newData) */
        let answer = await Product.updateOne({ id: { $eq: producto } }, { $set: { newData } })
        res.status(200).json(answer);
        res.status(200).send("Producto editado!");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// DELETE
const deleteProduct = async (req, res) => {
    try {
        const idProducto = req.params.id;
        /* let answer = await Provider.updateOne({ company }, newData) */
        let answer = await Product.deleteOne({ id: { $eq: idProducto } })
        res.status(200).json(answer);
        res.status(200).send("Producto borrado!. Has borrado:" + req.params.id);
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

module.exports = {
    createProduct,
    getProduct,
    editProduct,
    deleteProduct,
}