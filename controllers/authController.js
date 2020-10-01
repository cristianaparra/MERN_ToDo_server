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
  
}