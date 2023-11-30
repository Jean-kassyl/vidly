
function  check_bad_request_genres(req, res, next){
    
    if((req.url === "/api/genres") &&(Object.keys(req.body).length > 0) && !req.body.hasOwnProperty("genre")){
        return res.status(400).json({error: "Bad request, You must provide a genre"})
    }
    next()
}

function  check_bad_request_customers(req, res, next){
    if (req.url === "/api/customers"){
        const update_fields = Object.keys(req.body)
        const customerFields = ["name", "phone", "isGold"]
        update_fields.forEach( field => {
            if(!customerFields.includes(field)){
                res.status(400).send("you made a bad request, the costumer should have a name, phone, or a isGold property")
            }
        })
    }
   
    next()
}

module.exports = {
    check_bad_request_genres,
    check_bad_request_customers
}