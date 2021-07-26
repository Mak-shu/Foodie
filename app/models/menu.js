//the database name is always the plural of the model name so database name has to be menus
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true }
})

module.exports = mongoose.model('Menu',menuSchema)