const express = require('express')
const check_bad_request = require('./middlewares/check.js')
const genres = require('./routes/genres_routes')

const app = express()
app.use(express.json())
app.use(check_bad_request)


app.use('/api/genres', genres)
const port = process.env.PORT || 3003

app.listen(port, () => console.log("listening"))
