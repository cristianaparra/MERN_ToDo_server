const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const {validationResult} = require('express-validator')

//crea una nueva tarea
exports.crearTarea = async (req, res) => {

     //revisar si tengo errores
     const errores = validationResult(req);
     if (!errores.isEmpty()) {
         return res.status(400).json({ errores: errores.array() })
     }

}