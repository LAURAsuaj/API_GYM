const express = require("express"); 
const router = express. Router(); //manejador de rutas de express 
const personaSchema= require("../models/persona"); 
const planesSchema = require("../models/planes"); 

//planes 
router.post("/planes", (req, res) => { 
    const planes = planesSchema (req.body); 
    planes 
        .save().then((data) => { 
            res.json(data) 
        }).catch((error) => res.send(error)); 
});

//Modificar los datos de un plan para agregar una persona 
router.put("/planes/:id", async(req, res) => { 
    const { id } = req.params; 
    const persona = personaSchema (req.body); 
    var idPersona = null; 

    const personaConsulta = await personaSchema.findOne({ documento: req.body.codigo }); 
    if (!personaConsulta) { 
        await persona.save().then((dataPersona) => { 
            idPersona = dataPersona._id; 
    }); 
    } else { 
    idPersona = personaConsulta._id; 
    }

    planesSchema 
        .updateOne({ _id: id }, { 
            //$push >> agrega un nuevo elemento sin importar si ya existe 
            //$addToSet >> agrega un nuevo elemento sin repetirlo 
            $addToSet: { personas: idPersona } 
        }) 
        .then((data) => res.json(data)) 
        .catch((error) => res.json({ message: error })); 
}); 

module.exports = router;