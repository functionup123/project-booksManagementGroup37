const bookModel=require('../models/booksModel')



const createBook=async function(req,res){
    let bookData=req.body
    let createBookData=await bookModel.create(bookData)
  return res.status(201).send({status:true,message:"succesful",data:createBookData})
}


module.exports={ createBook}