const router = require('express').Router()
const {Genre} = require('../models/genre.js')
const {Movie, validateMovie} = require('../models/movie.js')


router.get('/', async (req, res) => {
    const movies = await Movie.find().sort({title: 1})
    res.send(movies)
})


router.get('/:id', async (req, res) => {
    const id = req.params.id 
    try {
        const movie = await Movie.findById({_id: id})
        if(!movie) return res.status(400).send("bad request: invalid id")
        res.send(movie)
    }catch(e){
        return res.status(500).send("an error occured " + e.message)
    }
})

router.post('/', async (req, res) => {

    const {error } = validateMovie(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    const genre = await Genre.findById({_id: req.body.genreId})
    if(!genre) return res.status(400).send("Bad request! Invalid genre...")
    const created_movie = {
        title: req.body.title,
        genre : {
            _id: genre._id,
            name: genre.name
        }
    }
    try {
        const new_movie = await Movie.create(created_movie)
        res.send(new_movie)
    }catch(e){
        return res.status(500).send("an error occured " + e.message)
    }
    
    
})

router.put('/:id', async (req, res) => {
    const id = req.params.id 
    const movie_to_update = await Movie.findById({_id: id})
   

    try {
        if(req.body.genreId && (req.body.genreId != movie_to_update.genre._id)) {
            const new_genre = await Genre.findById({_id: req.body.genreId})
            if(!new_genre) return res.status(400).send("Bad request! Invalid genre...")
            movie_to_update.genre = {
                _id: new_genre._id,
                name: new_genre.name
        }
    }
        if(req.body.title) movie_to_update.title = req.body.title 
        const new_movie = await movie_to_update.save()
        res.send(new_movie)
    } catch(e){
        return res.status(500).send("an error occured " + e.message)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id 
    try {
        await Movie.findByIdAndDelete({_id: id})
        res.send("the movie have successfully been deleted")
    }catch(e){
        return res.status(500).send("an error occured " + e.message)
    }
})


module.exports = router


/*

action "656812e7975b4d42c77d9b47"
romance "656812bb975b4d42c77d9b43"

*/