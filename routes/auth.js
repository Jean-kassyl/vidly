const _ = require('lodash')
const bcrypt = require("bcrypt")
const router = require('express').Router()
const {User} = require('../models/user')
const Joi = require('joi')


router.post("/", async (req, res) => {
    const {error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = User.findone({email: req.body.email})
    if(!user) return res.status(400).send("invalid email or password")

    let isAuth = await bcrypt.compare(req.body.password, user.password)
    if(!isAuth) return res.status(400).send("invalid email or password")

    res.send("welcome " + user.name)
})

function validate(req){
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    }

    return Joi.validate(req, schema)
}