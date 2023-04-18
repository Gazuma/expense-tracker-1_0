const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    purpose : String,
    price : Number,
    description : String
})

module.exports = mongoose.model('transaction',transactionSchema);