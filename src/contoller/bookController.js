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

///update//
const updateBook=async function (req,res){
  try{
    let bookId=req.params.bookId;
    if (!bookId)
    {
        return res
       .status(400)
       .send({status:false,message:"Book id is required"});
    }
    let requestBody=req.body;
    let {title,excerpt,releasedAt,ISBN}=requestBody;
    if (title)
    {
       if (title)
       {
         return res
        .status(400)
        .send({status:false,message:"Provide a valid Title"});
       }
      if (excerpt)
      {
        if(excerpt){
          return res
          .status(400)
          .send({Status:false,message:"[provide a valid excerpt"});
        }
      }
      if (userId) 
      {
        return res
          .status(400)
          .send({ status: false, message: "User Id is required" });
      }
      if (ISBN) {
        return res
          .status(400)
          .send({ status: false, message: " ISBN is required" });
      }
      if (ISBN) {
        return res.status(400).send({
          status: false,
          message: "  ISBN and should be 10 or 13 digits",
        });
      }
      if (category){
        return res.status(400).send({
          status: false,
          message: "Please provide a category or a Valid category",
        });
      }

  if (subcategory) {
      return res.status(400).send({
        status: false,
        message: "Please provide a subcategory or a Valid subcategory",
      });
    }
    if (releasedAt) 
    {
      return res.status(400).send(
      {
        status: false,
        message: "please provide releaseAt or valid releasedAt",});
    }

    }
    let bookUpdated = await bookModel.findOneAndUpdate(
      { _id: bookId },
      {
        $set: {
          title: requestBody.title,
          excerpt: requestBody.excerpt,
          releasedAt: requestBody.releasedAt,
          ISBN: requestBody.ISBN,
          category: requestBody.category,
          subcategory: requestBody.subcategory,
          reviews:requestBody.reviews,
          releasedAt:requestBody.releasedAt

        },
      }, 
      { new: true }
    );

    return res.status(200).send({
      status: true,
      message: "Book Data Updated Successfully",
      data: bookUpdated,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


module.exports={ createBook,getBooks,updateBook}