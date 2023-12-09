const router = require("express").Router()
const {Customer, validateCustomer} = require('../models/customer.js')


router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
    } catch(e){
        console.log(e.message)
    }
})


router.post('/', async (req, res) => {
    const {error } = validateCustomer(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }
    const new_customer = {
        name: req.body.name,
        phone: req.body.phone
    }
    if(req.body.isGold) new_customer.isGold = req.body.isGold
    try {
        const customer = await Customer.create(new_customer)
        return res.send(customer)
    } catch(e){
        return  res.status(500).send("error " + e.message)
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
    const possible_update_field = ["name", "phone", "isGold"]
    const values_for_update = {}

    Object.keys(req.body).forEach(key => {
        if(!possible_update_field.includes(key)){
           return res.status(400).send("bad request: " + key + " is invalid")
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
        return  res.status(500).send("error " + e.message)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Customer.findByIdAndDelete({_id: id})
        res.send(`the item of id ${id} is successfully deleted`)
    }catch(e){
        return  res.status(500).send("error " + e.message)
    }

})

module.exports = router