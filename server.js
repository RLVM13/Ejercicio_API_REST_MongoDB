const express = require('express')
const app = express()
const port = 3000

// Rutas

const productsRoutes = require("./routes/products.routes")
const providersRoutes = require("./routes/providers.routes")

app.use(express.json()); // Habilito recepción de JSON en servidor


app.use('/api/products', productsRoutes);
app.use('/api/providers', providersRoutes);

app.get('/', (req, res) => {
  res.send('Ejercicio API REST MongoDB!')
})


app.listen(port, () => {
  console.log(`Esto Tira!! Funcionando en: http://localhost:${port}`)
})