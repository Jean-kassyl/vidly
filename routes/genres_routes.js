const express = require('express')
const router = express.Router()
let {genres} = require('../genres.js')




router.get("/", (req, res) => {
    res.json(genres)
})


router.get("/:id", (req, res) => {
    const id = req.params.id
    const genre = check_ressource(id, res)
    if(genre){
        res.json(genre)
    }
})

router.post("/", (req, res) => {
    const body = req.body
    let id = genres.length + 1
    
    if(body.genre){
        const genre = {
            id: id,
            genre: body.genre
        }
        genres.push(genre)
        res.json(genre)
    }
   
})

router.put("/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    
    const item = check_ressource(id, res)
    if(item){
        item.genre = body.genre
        res.json(item)
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    const item = check_ressource(id, res)
    if(item){
       const new_genres = genres.filter(genre => genre.id != item.id)
       genres = new_genres
       res.json(new_genres)
    }
})

function check_ressource(id, res) {
    const ressource = genres.find(genre => genre.id == id)
    if(!ressource){
        res.status(404).json({error: "The ressource you asked for doesn't exist"})
        return null
    } else {
        return ressource
    }
}

module.exports = router;