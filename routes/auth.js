//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

const { check } = require('express-validator')


//crea un usuario

//api/usuarios
router.post('/',
    [
        check('email', 'agrerga un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 }),
        authController.autenticarUsuario
    ]
);

module.exports = router;