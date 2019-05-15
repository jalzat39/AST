const mongoose = require('mongoose');

const { Schema } = mongoose;

const moliendaSchema = new Schema({
    nombrePlanta: String,
    nombreMolienda: String,
    nombreProyecto: String,
    costoO: String,
    emisiones: String,
    costoR: String,
    capacidad: String,
    costosF: String,
    costosC: String
});

module.exports = mongoose.model('molienda', moliendaSchema);