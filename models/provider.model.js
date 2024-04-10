const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    company: { 
        type: String, 
        required: true,
        unique: true 
    },
    CIF: { 
        type: String, 
        required: true 
    },
    address:{
        type: String, 
        required: true
    },
    url_web: {
        type: String
    }
};
// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);


// Crear el modelo --> Colección
const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;


// Insertar un proveedor

/* const p = new Provider({
    id: 4,
    company: "Teatro Marquina",
    CIF: "B40236882",
    address: "Calle de Prim 11",
    url_web:"https://www.tortillasmarquina.com"
}); 

// Guardar en la BBDD
p.save()
.then((data)=>console.log(data))
.catch(err=>console.log(err))

Provider.find({}).then(data=>console.log(data)); */
