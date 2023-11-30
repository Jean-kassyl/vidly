const express = require('express')
const check_bad_request = require('./middlewares/check.js')
const genres = require('./routes/genres_routes')
const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/vidlyDB")
    .then(() => console.log("connect"))
    .catch(e => console.log(e))

const app = express()
app.use(express.json())
app.use(check_bad_request)


app.use('/api/genres', genres)
const port = process.env.PORT || 3003

app.listen(port, () => console.log("listening"))
