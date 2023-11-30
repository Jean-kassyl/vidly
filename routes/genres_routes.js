const express = require('express')
const router = express.Router()
const Genre = require('../models/models.js')
let {genres} = require('../genres.js')




router.get("/", async (req, res) => {
    const genres = await Genre.find()
    res.send(genres)
})


router.get("/:id", (req, res) => {
    const id = req.params.id
    const genre = check_ressource(id, res)
    if(genre){
        res.json(genre)
    }
})

router.post("/", async (req, res) => {
    const body = req.body
    
    
    if(body.genre){
       
        try {
            const new_genre = new Genre({genre: body.genre})
            const created_genre = await new_genre.save()
            res.send(created_genre)
        }catch(e){
        res.json({error: e.message})
        }
    }  
})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    const body = req.body
    
    const item = check_ressource(id, res)
    if(item){
        try {
            item.genre = body.genre
            const updatedItem = await item.save()
            res.json(updatedItem)
        }catch(e){
            res.json({error: e.message})
        }
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const item = check_ressource(id, res)
    if(item){
       try {
        await Genre.deleteOne({_id: item._id})
        const new_genres = await Genre.find()
        res.send(new_genres)
       }catch(e){
        res.json({error: e.message})
       }
      
    }
})

async function check_ressource(id, res) {
    const ressource = await Genre.findById({_id: id})
    if(!ressource){
        res.status(404).json({error: "The ressource you asked for doesn't exist"})
        return null
    } else {
        return ressource
    }
}

module.exports = router;