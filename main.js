const express = require('express')
const {check_bad_request_genres, check_bad_request_customers} = require('./middlewares/check.js')
const genres = require('./routes/genres_routes')
const customers = require('./routes/customers_routes')
const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/vidlyDB")
    .then(() => console.log("connect"))
    .catch(e => console.log(e))

const app = express()
app.use(express.json())


app.use(check_bad_request_genres)
app.use(check_bad_request_customers)


app.use('/api/genres', genres)
app.use('/api/customers', customers)
const port = process.env.PORT || 3003

app.listen(port, () => console.log("listening"))
