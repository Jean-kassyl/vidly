const mongoose = require("mongoose")
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

function check_if_ressource(id, res) {
        Movie.findById({_id: id})
            .then(movie => {
                if(movie){
                    return
                } else  {
                    res.status(404).send("the ressource you are asking doesn't exist")
                }
            } ).catch(e => {
                console.log(e)
                res.status(404).send("the ressource you are asking doesn't exist")
            })
}

module.exports = {
    Movie,
    check_if_ressource, 
    movieSchema
}