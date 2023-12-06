const mongoose = require('mongoose')
const Joi = require("joi")
const {movieSchema } = require('./movie.js')
const {customerSchema } = require('./models.js')


const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                trim: true,
                minLength: 5,
                maxLength: 50,
                required: true
            },
            isGold: {
                type: Boolean,
                default: false      
            }, 
            phone: {
                type: String,
                required: true,
                minLength: 8,
                maxLength: 50 
            }

        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                trim: true,
                minLength: 5,
                maxLength: 255,
                required: true
            }, 
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        dateOut: {
            type: Date,
            default: Date.now,
        },
        dateReturned: {
            type: Date
        },
        rentalFee: {
            type: Number,
            min: 0
        },
        required: true   
    }
    
})


const Rental = mongoose.model("Rental", rentalSchema)

function validateRental(rental){
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }

    return Joi.validate(rental, schema)
}


module.exports = {
    Rental,
    validateRental
}