const router = require("express").Router()
const {Rental, validateRental} = require("../models/rentals.js")
const {Customer} = require("../models/models.js")
const {Movie} = require("../models/movie.js")
const Fawn = require('fawn')


Fawn.init(mongoose)


router.get("/", async (req,res) => {
    try {
        const rentals = await Rental.find().sort('-dateOut')
        res.json(rentals)
    }catch(e) {
        console.log(e.message)
    }
})

router.post("/", async (req,res) => {
    const {error} = validateRental(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    try {
        const customer = await Customer.findById({_id: req.body.customerId})
        if(!customer) return res.status(400).send("invalid customer")
        const movie = await Movie.findById({_id: req.body.movieId})
        if(!movie) return res.status(400).send("invalid movie")
        if(movie.numberInStock === 0) return res.status(400).send("movie not available")

        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
                isGold: customer.isGold
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        })

       
        res.send(rental)

        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id: movie._id}, {
            $inc: {
                numberInStock: -1
            }
        })
        .run()
        

    } catch(e){
        console.log(e.message)
    }
    
    
    


})