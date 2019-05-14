const mongoose = require('mongoose');

const { Schema } = mongoose;

const ventaSchema = new Schema({
    nombre: String,
    venta1: String,
    venta2: String,
    venta3: String,
    venta4: String,
    venta5: String
});

module.exports = mongoose.model('venta', ventaSchema);