
function  check_bad_request(req, res, next){
    
    if((Object.keys(req.body).length > 0) && !req.body.hasOwnProperty("genre")){
        return res.status(400).json({error: "Bad request, You must provide a genre"})
    }
    next()
}

module.exports = check_bad_request;