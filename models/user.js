const mongoose = require("mongoose")
const Joi = require('joi')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    }
})

const User = mongoose.model("User", userSchema)


function userValidation(user){
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(user, schema)
}

module.exports = {
    User,
    userValidation
}