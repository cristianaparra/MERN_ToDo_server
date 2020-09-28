const express = require('express');
const conectarDB = require('./config/db')

//crear el servidro

const app = express()

//conectar a la base de datos
conectarDB()

// puerto de la app
const PORT = process.env.PORT || 4000;


// definir la pagina principal
app.get('/',(req, res)=>{
    res.send('hola mundo')
})

//arranca la app
app.listen(PORT, () => {
console.log(`El servidro esta funcionando en el puerto ${PORT}`)
});