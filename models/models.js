const mongoose = require("mongoose")

const genresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

const customersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    isGold: {
        type: Boolean,
        default: false
    }
})


module.exports = {
    Genre: mongoose.model("Genre", genresSchema),
    Customer: mongoose.model("Customer", customersSchema),
    genresSchema
}