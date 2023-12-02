const router = require('express').Router()
const {Genre} = require('../models/models.js')
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
   
    if (req.body.title && req.body.genre.name){
        Object.keys(req.body).forEach(field => {
            movie_to_create[field] = req.body[field]
        })

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
    const updated_values = {}
    Object.keys(req.body).forEach(field => {
        updated_values[field] = req.body[field]
    })
    try {
        const movie = await Movie.findByIdAndUpdate({_id: id}, updated_values, {new: true})
        res.json(movie)
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