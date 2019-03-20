const mongoose = require('mongoose');

const { Schema } = mongoose;

const positionSchema = new Schema({
    email: String,
    longitud: Number,
    latitud: Number,
    date: String
});

module.exports = mongoose.model('position', positionSchema);
