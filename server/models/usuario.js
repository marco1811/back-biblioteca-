const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el correo electronico']
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa la contraseña']

    },
    estado: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,


    }
});
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);