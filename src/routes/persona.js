const express = require("express");
const verifyToken = require('./validar_token');
const router = express.Router(); //manejador de rutas de express
const personaSchema = require("../models/persona");
const planesSchema = require("../models/planes");

//Nueva persona
router.post("/personas", (req, res) => {
    const persona = personaSchema(req.body);
    persona
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Consultar todas las personas
router.get("/personas", verifyToken ,(req, res) => {
    personaSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

     
  // Plan al que pertenece y la fecha de vencimiento
router.get("/planes/persona/:idPersona", async (req, res) => {
    const { idPersona } = req.params;
  
    try {
      const planes = await planesSchema.find({ personas: idPersona }).populate('personas');
  
      const persona = planes[0].personas.find(p => p._id.toString() === idPersona);

      const fechaIngreso = new Date(persona.fechaIngreso);
      const fechaVencimiento = new Date(fechaIngreso);
      fechaVencimiento.setDate(fechaIngreso.getDate() + 31);
  
      // Devolver plan y vencimiento
      res.json({
        plan: {
          nombreP: planes[0].nombreP,
          descripcion: planes[0].descripcion
        },
        fechaIngreso: fechaIngreso.toISOString().split('T')[0],
        fechaVencimiento: fechaVencimiento.toISOString().split('T')[0]
      });
  
    } catch (error) {
      console.error("ERROR REAL:", error);
      res.status(500).json({ mensaje: "Error consultando planes", error });
    }
  });

//Consultar una persona por su id
router.get("/personas/:id", (req, res) => {
        const { id } = req.params;
        personaSchema
            .findById(id)
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
    });

    //Modificar los datos de una persona por su id
router.put("/personas/:id", (req, res) => {
        const { id } = req.params;
        const { nombre, edad, peso, estatura, fechaIngreso } = req.body;
        personaSchema
            .updateOne({ _id: id }, {
                $set: { nombre, edad, peso, estatura, fechaIngreso }
            })
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error }));
     });

     //Eliminar una persona por su id
router.delete("/personas/:id", (req, res) => {
      const { id } = req.params;
      personaSchema
        .findByIdAndDelete(id)
        .then((data) => {
          res.json(data);
       })
        .catch((error) => {
          res.json({ message: error });
        });
    });

module.exports = router;


    
