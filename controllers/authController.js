const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {

    //revisar si tengo errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    //extraer email y password
    const { email, password } = req.body;

    try {
        //revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'el usuareio no existe' })
        }

        //revisar el password
        const passCorrecto = await bcrypt.compare(password, usuario.password)
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'password incorrecto' })
        }

        //si todo es correcto crear y fiormar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        },
            (error, token) => {
                if (error) throw error;
                res.json({ token: token, msg: 'Usuario creado correctamente' });
            })




    } catch (error) {
        console.log(error)
    }

}