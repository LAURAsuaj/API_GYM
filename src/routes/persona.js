const express = require("express");
const router = express.Router(); //manejador de rutas de express
const personaSchema = require("../models/persona");

//Nueva persona
router.post("/personas", (req, res) => {
    const persona = personaSchema(req.body);
    persona
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Consultar todas las personas
router.get("/personas", (req, res) => {
    personaSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
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


    
