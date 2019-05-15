const mongoose = require('mongoose');

const { Schema } = mongoose;

const hornoSchema = new Schema({
    nombrePlanta: String,
    nombreHorno: String,
    nombreProyecto: String,
    costoO: String,
    emisiones: String,
    costoR: String,
    capacidad: String,
    costosF: String,
    costosC: String
});

module.exports = mongoose.model('horno', hornoSchema);