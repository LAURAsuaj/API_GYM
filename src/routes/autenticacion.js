const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const router = express.Router(); //manejador de rutas de express
const userSchema = require("../models/usuario");

router.post('/signup', async (req, res) => {
    const { usuario, correo, huella } = req.body;
    const user = new userSchema({
        usuario: usuario,
        correo: correo,
        huella: huella
    });
    user.huella = await user.encryptHuella (user.huella);
    await user.save(); //save es un método de mongoose para guardar datos en MongoDB 
    
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24, //un día en segundos
    });
    res.json({
        message: "Usuario guardado.",
        auth: true,
        token,
    });
});


//inicio de sesión
router.post("/login", async (req, res) => {
    // validaciones
    const { error } = userSchema.validate(req.body.correo, req.body.huella);
    if (error) return res.status(400).json({ error: error.details[0].message });

    //Buscando el usuario por su dirección de correo
    const user = await userSchema.findOne({ correo: req.body.correo });
    //validando si no se encuentra
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });
    //Transformando la contraseña a su valor original para 
    //compararla con la Huella que se ingresa en el inicio de sesión
    const validPassword = await bcrypt.compare(req.body.huella, user.huella);
    if (!validPassword)
        return res.status(400).json({ error: "Huella no válida" });

    // Genera un token al iniciar sesión
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
    });

    res.json({
        error: null,
        data: "Bienvenido(a)",
        token
    });
});

module.exports = router;
