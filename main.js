const Joi = require('joi') 
Joi.objectId = require('joi-objectid')(Joi)

const express = require('express')
const check_valid_id = require('./middlewares/check.js')
const genres = require('./routes/genres_routes')
const customers = require('./routes/customers_routes')
const movies = require('./routes/movies_routes')
const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/vidlyDB")
    .then(() => console.log("connect"))
    .catch(e => console.log(e))

const app = express()
app.use(express.json())

app.use(check_valid_id)




app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)

const port = process.env.PORT || 3003

app.listen(port, () => console.log("listening"))
