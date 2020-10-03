const express = require('express');
const conectarDB = require('./config/db');

//crear el servidro

const app = express();

//conectar a la base de datos
conectarDB();

//habilitar express.jason
app.use(express.json({ extended: true }));

// puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// definir la pagina principal
app.get('/', (req, res) => {
    res.send('hola mundo')
});

//arranca la app
app.listen(PORT, () => {
    console.log(`El servidro esta funcionando en el puerto ${PORT}`)
});