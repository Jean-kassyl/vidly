const router = require("express").Router()
const {Customer} = require('../models/models.js')


router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
    } catch(e){
        console.log(e.message)
    }
})


router.post('/', async (req, res) => {
    const new_customer = {
        name: req.body.name,
        phone: parseInt(req.body.phone),
        isGold: req.body.isGold
    }
    try {
        const customer = await Customer.create(new_customer)
        res.json(customer)
    } catch(e){
        console.log(e.message)
    }
})




router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const customer = await Customer.findById({_id: id})
        if(!customer){
            res.status(404).send("the item you required is not available")
        }
        res.send(customer)
    } catch(e){
        console.log(e.message)
    }
})


router.put('/:id', async (req, res) => {
    const id = req.params.id
    const values_for_update = {}

    Object.keys(req.body).forEach(key => {
        if(key === "phone"){
            values_for_update[key] = parseInt(req.body[key])
        } else {
            values_for_update[key] = req.body[key]
        }
    })
    try {
        const customer = await Customer.findByIdAndUpdate(id, values_for_update, {new: true})
        if(!customer){
            res.status(404).send("the item you required is not available")
        }
        res.send(customer)
    } catch(e){
        console.log(e.message)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Customer.findByIdAndDelete({_id: id})
        res.send(`the item of id ${id} is successfully deleted`)
    }catch(e){
        console.log(e.message)
    }

})

module.exports = router