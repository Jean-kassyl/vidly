const _ = require("lodash")
const bcrypt = require("bcrypt")
const router = require('express').Router()
const {User, userValidation} = require("../models/user")


router.get("/", async (req,res) => {
    const users = await User.find().sort("name")
    res.send(users)
})


router.get("/:id", async (req,res) => {
    try {
        const user = await User.findById({_id: id})
        if(!user) return res.status(400).send("bad request: invalid id")
        return res.send(user)
    } catch(e){
        res.status(500).send("internal server down: come back later  " + e.message)
    }
})



router.post("/", async (req,res) => {
    const {error } = userValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    try {
        let user = User.findOne({email: req.body.email})
        if(user) return res.status(400).send("You are already registered")

        let salt = await bcrypt.genSalt(10)
        let hashed_pass = await bcrypt.hash(req.body.password, salt)

        let new_user = {
            ..._.pick(req.body, ["name", "email"]),
            password: hashed_pass
        }

        user = await User.create(new_user)
        user = _.pick(user, ["_id","name", "email"])
        return res.send(user)
    } catch(e){
        res.status(500).send("internal server down: come back later  " + e.message)
    }
})


router.put("/:id", async (req,res) => {
   if(req.body.name && req.body.email && req.body.password){
    const {error } = userValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
   }

   const new_user = {};
   Array.keys(req.body).forEach(key => {
    new_user[key] = body.req[key]
   })
   
    try {
        const user = await User.findByIdAndUpdate({_id: id}, new_user, {new: true} )
        if(!user) return res.status(400).send("bad request: invalid id")
        return res.send(user)
    } catch(e){
        res.status(500).send("internal error: come back later  " + e.message)
    }
})

router.delete("/:id", async (req,res) => {
    try {
        const user = await User.findByIdAndDelete({_id: id})
        return res.send(user + " have been successfully deleted")
    } catch(e){
        res.status(400).send("internal server down: come back later  " + e.message)
    }
})

module.exports = router