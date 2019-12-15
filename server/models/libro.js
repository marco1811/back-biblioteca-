const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Categoria = require('./categoria');


let Schema = mongoose.Schema;
let libroSchema = new Schema({
    nombreDeLibro: {
        type: String,
        unique: true,
        required: [true, 'ingrese el nombre del libro por favor ']

    },
    editorial: {
        type: String,
        required: [true, "ingrese la editorial por favor "]
    },
    autor: {
        type: String,
        required: [true, "ingrese el nombre del autor por favor  "]


    },
    precioDeRenta: {
        type: Number,
        required: [true, "ingresa el precio por favor  "]
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, "ingresa la categoria por favor "]
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,

    }

});

libroSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Libro', libroSchema);