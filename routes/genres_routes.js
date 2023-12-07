const express = require('express')
const router = express.Router()
const {Genre, validateGenre} = require('../models/genre.js')





router.get("/", async (req, res) => {
    const genres = await Genre.find().sort({name: 1})
    res.send(genres)
})


router.get("/:id", async (req, res) => {
    const id = req.params.id
    const genre = await Genre.findById({_id: id})
    if(!genre) return res.status(400).send("bad request: required item is not available")
    return res.send(genre)
})

router.post("/", async (req, res) => {
    const {error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message) 
    try {
        let new_genre = new Genre({name: body.name})
        new_genre = await new_genre.save()
        res.send(new_genre)
    }catch(e){
        res.status().json({error: e.message})
    } 
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const {error } = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message)  
    try {
        const item = await Genre.findById({_id: id})
        item.name = body.genre
        const updatedItem = await item.save()
        res.json(updatedItem)
    }catch(e){
        res.json({error: e.message})
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    try {
        await Genre.findByIdAndDelete({_id: id})
        const new_genres = await Genre.find()
        res.send(new_genres)
    }catch(e){
        res.json({error: e.message})
    }
})


module.exports = router;