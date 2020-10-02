const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')

//crea un proyectos
//api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'el nombre del poryecto es obligatirio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

//obtener todo los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

// actualizar proyectos via id
router.put('/:id',
    auth,
    [
        check('nombre', 'el nombre del poryecto es obligatirio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

module.exports = router;