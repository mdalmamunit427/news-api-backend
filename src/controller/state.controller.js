import UserModel from "../model/user.model.js";
import ArticleModel from "../model/article.model.js";
import ReviewModel from "../model/review.model.js";

export const adminState=async(req,res)=>{
    try {
        const totalUser=await UserModel.countDocuments()
        const totalReviews=await ReviewModel.countDocuments()
        const totalPostResult=await ArticleModel.aggregate([
            {
                $group:{
                    _id:null,
                    totalPost:{$sum:1}
                }
            }
        ])

        const totalPostallTime=totalPostResult.length > 0 ? totalPostResult[0].totalPost:0

        const monthlyPostResult=await ArticleModel.aggregate([
            {
                $group:{
                    _id:{month:{$month:"$createdAt"},year:{$year:"$createdAt"}},
                    monthlyPost:{$sum:1},
                },
            },
            {
                $sort:{"_id.year":1,"_id.month":1}
            }
        ])

        const monthlyPosts=monthlyPostResult.map(entry=>({
            month:entry._id.month,
            year:entry._id.year,
            posts:entry.monthlyPost
        }))
        res.status(200).json({
            totalUser,
            totalReviews,
            totalPostallTime,
            monthlyPosts
        })
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}