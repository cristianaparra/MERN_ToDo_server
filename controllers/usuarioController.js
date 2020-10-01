const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')

exports.crearUsuario = async (req, res) => {
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
        usuario.password = await bcrypt.hash(password, salt );

        //guardar usuario
        await usuario.save();

        //mensaje de confirmacion
        res.status(400).json({ msg: 'el usuareio estra creado correctamente' })

    } catch (error) {
        console.log('error')
        res.status(400).send('algo paso')
    }
}