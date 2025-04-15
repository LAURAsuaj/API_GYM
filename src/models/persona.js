const mongoose = require("mongoose"); // importando el componente mogoose
const personaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
  estatura: {
    type: Number,
    required: true,
  },
  fechaIngreso: {
    type: Date,
    default: Date.now,
  },
  documento: {
    type: String,
    require:true,
    unique: true
  },

});
module.exports = mongoose.model("Persona", personaSchema);