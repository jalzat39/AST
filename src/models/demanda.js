const mongoose = require('mongoose');

const { Schema } = mongoose;

const demandaSchema = new Schema({
    nombre: String,
    demanda1: String,
    demanda2: String,
    demanda3: String,
    demanda4: String,
    demanda5: String
});

module.exports = mongoose.model('demanda', demandaSchema);