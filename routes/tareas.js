const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator')

//crear una tarea
//api/tareas
router.post('/',
auth,
[check('nombre', 'el nombre es obligatorio').not().isEmpty()],
    tareaController.crearTarea
)

module.exports = router;