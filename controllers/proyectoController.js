const Proyecto = require('../models/Proyecto')
const { validationResult } = require('express-validator');


exports.crearProyecto = async (req, res) => {

    //revisar si tengo errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }


    try {
        //crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //guardar el ccreador via jwt
        proyecto.creador = req.usuario.id;

        //guardamos el proyecto
        proyecto.save();
        res.json(proyecto);


    } catch (error) {
        console.log(error)
        res.status(500).send('wacho error')
    }
}

//obtiene todo los poryectos del usuario actrual
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 });
        res.json({ proyectos });
    } catch (error) {
        console.log(error)
        res.status(500).send('wacho error')
    }
}