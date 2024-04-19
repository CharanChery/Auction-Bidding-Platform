const mongoose = require('mongoose')


const DetailSchema = new mongoose.Schema({
    name:String,
    password:String
})

module.exports = mongoose.model('data',DetailSchema)