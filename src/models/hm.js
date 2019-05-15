const mongoose = require('mongoose');

const { Schema } = mongoose;

const hmSchema = new Schema({
    nombreMolienda: String,
    distancia: String,
});

module.exports = mongoose.model('hm', hmSchema);