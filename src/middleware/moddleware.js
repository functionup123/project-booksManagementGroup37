const jwt = require("jsonwebtoken")
const booksModel = require("../models/booksModel")
const authentication = async function(req, res, next){
    try {
        let token = req.headers['x-api-key']
        if (!token){
            return res.status(404).send({status: false, msg: "token must be present"})
        }
    
        let decodedToken = jwt.verify(token, "functionup-plutonium")
        if(!decodedToken){
            return res.status(401).send({status: false, msg: "token is invalid"})
        }
        req.token = decodedToken
        next()   
    } catch (error) {
        return res.status(500).send({msg:error.message})
    }
}
module.exports.authentication= authentication