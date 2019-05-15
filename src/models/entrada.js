const mongoose = require('mongoose');

const { Schema } = mongoose;

const entradaSchema = new Schema({
    emisiones: String,
    costoTransporte: String,
    capital: String,
    red: String,
    hornos: String,
    moliendas: String,
    clientes: String,
    planeacion: String
});

module.exports = mongoose.model('entrada', entradaSchema);