const mongoose = require("mongoose"); // importando el componente mongoose
const bcrypt = require("bcrypt"); // importando el componente bcrypt
const userSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    huella: {
        type: String,
        required: true
    }
});
userSchema.methods.encryptHuella  = async (huella) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(huella, salt);
}
module.exports = mongoose.model('User', userSchema);
