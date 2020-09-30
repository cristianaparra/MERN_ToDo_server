const Usuario = require('../models/Usuario')

exports.crearUsuario = async (req, res) => {


    try {
        let usuario;
        //crear el nuevo usuario
        usuario = new Usuario(req.body);

        //guardar usuario
        await usuario.save();

        //mensaje de confirmacion
        res.send('usuario creado correcamente')

    } catch (error) {
        console.log('error')
        res.status(400).send('algo paso')
    }
}