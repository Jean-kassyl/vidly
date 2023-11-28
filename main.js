const express = require('express')
let {genres} = require('./genres.js')

const app = express()
app.use(express.json())

app.get("/api/genres", (req, res) => {
    res.json(genres)
})


app.get("/api/genres/:id", (req, res) => {
    const id = req.params.id
    const genre = check_ressource(id, res)
    if(genre){
        res.json(genre)
    }
})

app.post("/api/genres", (req, res) => {
    const body = req.body
    let id = genres.length + 1
    const sentGenre = check_badRequest(body,res)
    if(sentGenre){
        const genre = {
            id: id,
            genre: sentGenre.genre
        }
        genres.push(genre)
        res.json(genre)
    }
   
})

app.put("/api/genres/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    const sentGenre = check_badRequest(body,res)
    const item = check_ressource(id, res)
    if(item){
        item.genre = sentGenre.genre
        res.json(item)
    }
})

app.delete("/api/genres/:id", (req, res) => {
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

function check_badRequest(genre,res){
    if(!genre.hasOwnProperty("genre")){
        return res.status(400).json({error: "Bad request, you should create an object with a genre property"})
    }else {
        return genre
    }
}

const port = process.env.PORT || 3003

app.listen(port, () => console.log("listening"))
