const mongoose = require("mongoose"); // importando el componente mogoose 
const planesSchema = mongoose.Schema({ 
    nombreP: { 
        type: String, 
        required: true 
    }, 
    descripcion: { 
        type: String, 
        required: true 
    }, 
    personas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Persona' }] 
}); 
module.exports = mongoose.model('Planes', planesSchema);