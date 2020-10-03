const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const { validationResult } = require('express-validator')

//crea una nueva tarea
exports.crearTarea = async (req, res) => {

    //revisar si tengo errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }


    try {
        //extraer el proyecto y comprobar si existe

        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto)
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'proyecto no encontrado' })
        }

        // revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'no autorizado' });
        }

        //creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('tienes un error wacho')
    }
}

//obtiene las tareas por poryecto
exports.obtenerTareas = async (req, res) => {
    try {
        //extraer el proyecto y comprobar si existe

        const { proyecto } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto)
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'proyecto no encontrado' })
        }

        // revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'no autorizado' });
        }
        // obtener tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json({ tareas })
    } catch (error) {
        console.log(error);
        res.status(500).send('tienes un error wacho');
    }

}

//actualizar tarea

exports.actualizarTareas = async (req, res) => {
    try {
        //extraer el proyecto y comprobar si existe

        const { proyecto, nombre, estado } = req.body;

        //la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res.status(401).json({ msg: 'no existe esa tarea' });
        }

        //extrae proyecro
        const existeProyecto = await Proyecto.findById(proyecto)


        // revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'no autorizado' });
        }

        // crear un objeto con la nueva informacion
        const nuevaTarea = {};


        nuevaTarea.nombre = nombre;

        nuevaTarea.estado = estado;


        //guardar la tarea
        tarea = await Tarea.findByIdAndUpdate({ _id: req.params.id }, nuevaTarea, { new: true });

        res.json({ tarea });


    } catch (error) {
        console.log(error);
        res.status(500).send('tienes un error wacho');
    }

}
//elimnar tarea
exports.eliminarTarea = async (req, res) => {
    try {
        //extraer el proyecto y comprobar si existe

        const { proyecto } = req.body;

        //la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if (!tarea) {
            return res.status(401).json({ msg: 'no existe esa tarea' });
        }

        //extrae proyecro
        const existeProyecto = await Proyecto.findById(proyecto)


        // revisar si el proyecto actual pertenece al usuario autenticado
        //verificar el creador del proyecto
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'no autorizado' });
        }
        //elimnar
        await Tarea.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'tarea eliminada' })


    } catch (error) {
        console.log(error);
        res.status(500).send('tienes un error wacho');
    }

}
