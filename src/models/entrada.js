const mongoose = require('mongoose');

const { Schema } = mongoose;

const entradaSchema = new Schema({
    emisiones: String,
    costoTransporte: String,
    clientes: String,
    hornos: String,
    moliendas: String,
    r: String,
    y: String,
    t: String,
    tax: String
});

module.exports = mongoose.model('entrada', entradaSchema);