const express = require('express')
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')

//crea un proyectos
//api/proyectos
router.post('/',
proyectoController.crearProyecto
);


modulke.exports = router;