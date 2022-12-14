const mongoose= require("mongoose")
const objectId=mongoose.Schema.Types.ObjectId


let reviewSchema= new mongoose.Schema({
    bookId: {type:objectId, required:true, ref:"Book" }, //ref
    reviewedBy: {type:String, required:true,default:'Guest'}, //
    reviewedAt: {type:Date, required:true, default:Date.now()},
    rating: {type:Number, required:true}, //, min 1, max 5
    review: {type:String},
    isDeleted: {type:Boolean, default: false},
  },{timestamps:true})

module.exports=mongoose.model('Review',reviewSchema)
