const router = require('express').Router()
const {Genre} = require('../models/genre.js')
const {Movie, check_if_ressource} = require('../models/movie.js')


router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find().sort({title: 1})
        res.json(movies)
    }catch(e){
        console.log(e)
    }
})


router.get('/:id', async (req, res) => {
    const id = req.params.id 
    check_if_ressource(id, res)
    try {
        const movie = await Movie.findById({_id: id})
        res.json(movie)
    }catch(e){
        console.log(e)
    }
})

router.post('/', async (req, res) => {
    const movie_to_create = {}
   
    if (req.body.title && req.body.genre){
        const genre = await Genre.findById({_id: req.body.genre})
        if(genre){
            Object.keys(req.body).forEach( field => {
                if(field === "genre"){
                    movie_to_create.genre = genre
                } else {
                    movie_to_create[field] = req.body[field]
           
                }
            })
        } else {
            res.status(400).send("Bad request! Invalid genre...")
        }
        
        try {
            const new_movie = await Movie.create(movie_to_create)
            res.json(new_movie)
        }catch(e){
            console.log(e.message)
        }
    }
    
})

router.put('/:id', async (req, res) => {
    const id = req.params.id 
    check_if_ressource(id, res)
    const movie_to_update = await Movie.findById({_id: id})
   
    if(req.body.genre && (req.body.genre != movie_to_update.genre._id)) {
        const new_genre = await Genre.findById({_id: req.body.genre})
        Object.keys(req.body).forEach( field => {
            if(field === "genre"){
                movie_to_update.genre = new_genre
            } else {
                movie_to_update[field] = req.body[field]
            }
        })
    } else {
        Object.keys(req.body).forEach( field => {
            movie_to_update[field] = req.body[field]
        })
        
    }
    try {
        const new_movie = await movie_to_update.save()
        res.json(new_movie)
    }catch(e){
        console.log(e)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id 
    check_if_ressource(id, res)
    try {
        await Movie.findByIdAndDelete({_id: id})
        res.send("the movie have successfully been deleted")
    }catch(e){
        console.log(e)
    }
})


module.exports = router


/*

action "656812e7975b4d42c77d9b47"
romance "656812bb975b4d42c77d9b43"

*/