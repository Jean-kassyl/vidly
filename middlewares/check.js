const mongoose = require('mongoose')


function check_valid_id(req, res, next) {
    const id = req.params.id 
    if(id &&  !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send("bad request: invalid id")
    }
    next()
}

module.exports = check_valid_id