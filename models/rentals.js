const mongoose = require('mongoose')
const joi = require("joi")
const {movieSchema } = require('./movie.js')
const {customerSchema } = require('./models.js')


const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movies: {
        type: [movieSchema],
        validate: {
            validator(v){
                return v.length > 0
            },
            message: "You must rent at least one movie"
        }
       
    }
})


const Rental = mongoose.model("Rental", rentalSchema)



function validateRental(rented_movie){
    schema = {
        customer: joi
    }
}