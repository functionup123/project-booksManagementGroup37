const userModel=require('../models/userModel.js')

const createUser=async function(req,res){
try{
    let data=req.body
const userData= await userModel.create(data)
res.status(201).send({status:true,msg:userData})
}
catch(err){
res.status(500).send({status:false, msg:err.message})
}

}


module.exports.createUser=createUser