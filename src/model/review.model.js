import mongoose from "mongoose";

const reviewSchema=mongoose.Schema({
    comment:{type:String,required:true},
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    articleID:{type:mongoose.Schema.Types.ObjectId,ref:"Article",required:true},
},{ timestamps: true});

const ReviewModel=mongoose.model("Review",reviewSchema);
export default ReviewModel;