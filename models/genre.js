const mongoose = require("mongoose")
const Joi = require('joi')

const genresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 100
    }
})


function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(100).required()
    }
    return Joi.validate(genre, schema)
}



module.exports = {
    Genre: mongoose.model("Genre", genresSchema),
    validateGenre,
    genresSchema,
   
}