const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')

//crear una tarea
//api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'el Proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
)
router.get('/',
    auth,
    tareaController.obtenerTareas
)
router.put('/:id',
    auth,
    tareaController.actualizarTareas
)

module.exports = router;