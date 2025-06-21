import ReviewModel from "../model/review.model.js";

export const PostReview=async(req,res)=>{
    try {
        const {comment,userID,articleID}=req.body;

        if(!comment || !userID || !articleID  === undefined){
            return res.status(400).json({message:"Missing required parameters"});
        }

        const review=new ReviewModel({comment,userID,articleID})
        await review.save()

        res.status(200).json({message:"Reviews posted successfully"})
    }catch(err){

    }
}


export const getAllReviews=async(req,res)=>{
    const {userID}=req.params;
    try {
        const data=await ReviewModel.find({userID:userID}).sort({createdAt:-1})
        if(data.length === 0){
            return res.status(404).json({message:"No review found"})
        }
        res.status(200).json({message:"Reviews founded successfully",data:data})
    }catch(err){
        res.status(404).json({message:"No review found"})
    }
}


export const deleteReview=async(req,res)=>{
    const {id}=req.params;
    try {
        const data=await ReviewModel.findByIdAndDelete(id);
        if(!data){
            return res.status(404).json({message:"No review found"})
        }
        res.status(200).json({message:"Review deleted"})
    }catch(err){
        res.status(404).json({message:"No review found"})
    }
}