const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        required: true,
        unique: true 
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        //ESTA "REF" ES LA FOREING KEY DE LA OTRA TABLA PARA LA RELACION
        ref: 'Provider'
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image:{
        type: String,
        validate: {
            validator: function(url){
                if(url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Porfa, sólo imágenes JPG o PNG"
        }
    }
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);


// Crear el modelo --> Colección
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// Insertar un producto
 
/* const p = new Product({
    id: 4,
	title: "Tortilla - Marquina",
	price: 1.80,
    description:"La mejor tortilla de la zona en el Teatro Marquina",
	provider: "6613fe140f302cb6fdf8937c",
});

// Guardar en la BBDD
p.save()
.then((data)=>console.log(data))
.catch(err=>console.log(err))

Product.find({}).then(data=>console.log(data));  */