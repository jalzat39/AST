const mongoose = require('mongoose');

const { Schema } = mongoose;

const ciudadSchema = new Schema({
    nombre: String,
    latitud: String,
    longitud: String
});

module.exports = mongoose.model('ciudad', ciudadSchema);