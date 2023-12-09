const mongoose = require("mongoose")
const Joi = require('joi')


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 255
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 20
    },
    isGold: {
        type: Boolean,
        default: false
    }
})

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(6).max(20).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema)
}


module.exports = {
    Customer: mongoose.model("Customer", customerSchema),
    customerSchema,
    validateCustomer
}