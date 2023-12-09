const mongoose = require("mongoose")
const Joi = require("joi")
const {genresSchema} = require('./genre.js')


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3
    },
    genre: {
        type: genresSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        default: 0
    },
    dailyRentalRate: {
        type: Number,
        default: 0
    }
})




const Movie  = mongoose.model('Movie', movieSchema)


function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).required(),
        genreId: Joi.objectId().required(),
    }

    return Joi.validate(movie, schema)
}

module.exports = {
    Movie,
    validateMovie, 
    movieSchema
}