const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {

    //revisar si tengo errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }


    //extraer email y password
    const { email, password } = req.body;

    try {
        // revisart que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({ msg: 'el usuareio ya esiste' })
        }
        //crear el nuevo usuario
        usuario = new Usuario(req.body);


        //hashear el password
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //crear y fiormar el jwt
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


        res.status(400).json({ msg: 'el usuareio estra creado correctamente' })

    } catch (error) {
        console.log('error')
        res.status(400).send('algo paso')
    }
}