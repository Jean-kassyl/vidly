
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
                return
            }
        })
    }
   
    next()
}

function  check_bad_request_movies(req, res, next){
    if (req.url === "/api/movies"){
        const update_fields = Object.keys(req.body)
        const customerFields = ["title", "genre", "numberInStock", "dailyRentalRate"]
        update_fields.forEach( field => {
            console.log(customerFields.includes(field) )
            if(!customerFields.includes(field)){
                return res.status(400).send("you made a bad request, the movie should have a title, a genre, a numberInStock and/or a dailyRentalRate property")
                
                
            }
            if(field == "genre" && ((typeof(req.body[field]) != Object ) || (!req.body[field].hasOwnProperty('name') )  ) ){
                return res.status(400).send("you made a bad request, the genre property is an object with a name property")
                 
            } 
            
           
        }) 
    } 
    next()
    
}

module.exports = {
    check_bad_request_genres,
    check_bad_request_customers,
    check_bad_request_movies
}