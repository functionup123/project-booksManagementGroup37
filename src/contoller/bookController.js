const bookModel=require('../models/booksModel')
const reviewModel=require('../models/reviewModel')
const mongoose = require('mongoose')


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

const getBooksByParams = async function (req, res) {
  
  try {
      let bookId = req.params.bookId
      let book = mongoose.Types.ObjectId.isValid(bookId)
      if (!book) {
          return res.status(400).send({ status: false, message: "Book Id is required in path params!" })
      }
      let isValid = await bookModel.findOne({ _id: bookId });
      if (!isValid) {
          return res.status(404).send({
              status: false,
              message:
                  "No book is present with this id !",
          });
      }
      // review alike
      const { title, excerpt, userId,ISBN,category,subcategory, reviews,isDeleted,releasedAt } = isValid
       const review = await reviewModel.find({bookId : isValid._id }).select({ bookId:1,reviewedBy:1,reviewedAt:1,rating:1,review:1 })

      const data = {
          title: title,
          excerpt: excerpt,
          userId: userId,
          ISBN:ISBN,
        category:category,
        subcategory:subcategory,
        isDeleted:isDeleted,
        releasedAt:releasedAt,
         reviews: review.length ? review : { message: "0 review for this Book." }
      }
      return res.status(200).send({ status: true, data: data })

  } catch (err) {
      return res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports={ createBook,getBooks,getBooksByParams}