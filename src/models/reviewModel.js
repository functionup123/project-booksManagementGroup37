const mongoose= require("mongoose")
//const booksModel = require("../models/BooksModel")
const ObjectId=mongoose.Schema.Types.ObjectId


let reviewSchema= new mongoose.Schema({
    bookId: {type:String, required:true  }, //ref
    reviewedBy: {type:String, required:true}, //default:'Guest'
    reviewedAt: {type:Date, required:true},
    rating: {type:Number, required:true}, //, min 1, max 5
    review: {type:String},
    isDeleted: {type:Boolean, default: false},
  },{timestamps:true})

module.exports=mongoose.model('Review',reviewSchema)
