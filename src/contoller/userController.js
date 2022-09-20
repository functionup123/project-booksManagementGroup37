const userModel=require('../models/userModel.js')
const jwt =require("jsonwebtoken")

const createUser=async function(req,res){
try{
    let data=req.body
    
const userData= await userModel.create(data)
res.status(201).send({status:true,message:userData})
}
catch(err){
res.status(500).send({status:false, message:err.message})
}

}
/*------------------------------------------------------------------------------------------------------------------------------------*/
const loginUser = async function (req, res) {
    try {
      let userName = req.body.email;
      let password = req.body.password;
      let user = await userModel.findOne({ email: userName });
      if (!user) {
        return res.status(400).send({ status: false, message: "username is not corerct", });
      }
      let pass = await userModel.findOne({ password: password });
      if (!pass) {
        return res.status(400).send({ status: false, message: "password is not corerct", });
      }
      let token = jwt.sign(
        {
          userId: user._id.toString(),
          batch: "project3",
          organisation: "group37"
        },
        "functionup-plutonium" ,
        {expiresIn: '24h'}
      );
     
      res.status(200).send({ status: true, message:"Success" ,data: token  });
  
    } catch (err) {
      res.status(500).send({ message: "server error", error: err })
    }
  
  }
  

module.exports={createUser,loginUser}