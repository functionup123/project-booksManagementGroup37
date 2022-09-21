const bookModel=require('../models/booksModel')



const createBook=async function(req,res){
  try { 
    let bookData=req.body
    let createBookData=await bookModel.create(bookData)
  return res.status(201).send({status:true,message:"succesful",data:createBookData})
}
catch(err){
  return res.status(500).send({status:false,message:err.msg}) 
}
}


const getBooks = async function (req, res) {
try {
let { userId, category, subcategory} = req.query
  let filter= {isDeleted:false}
 
  if (userId) { filter.userId = userId }
  if (category) { filter.category = category }
  if (subcategory) { filter.subcategory =subcategory  }

  let savedData = await bookModel.find(filter).select({ title:1, excerpt:1, userId:1, category:1, releasedAt:1, reviews:1,subcategory:1})
  if (savedData.length == 0) {
    return res.status(404).send({ status: false, msg: "no document found" })
  }
  return res.status(200).send({ status: true, msg: savedData })
}
catch (err) {
  res.status(500).send({ status: false, msg: err.message })
}
}


module.exports={ createBook,getBooks}