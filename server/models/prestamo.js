const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Libro = require('./libro');
let fecha=new Date();

let regreso=fecha +15;

let Schema = mongoose.Schema;
let prestamoSchema = new Schema({
Usuario:{
    type:Schema.Types.ObjectId,
    ref:'Usuario',
    required:[true,'ingresa el codigo del usuario ']

},
Libro:{
    type:Schema.Types.ObjectId,
    ref:'libro',
    required:[true,'ingresa el codigo del libro ']
},
FechaPrestamo:{
    type:Date,
    default:fecha
},

FechaDevolucion:{
    type:Date,
    default:regreso
},
prestado:{
    type:Boolean,
    default:true
}



});
prestamoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Prestamo', prestamoSchema);
