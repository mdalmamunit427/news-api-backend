import ArticleModel from "../model/article.model.js";
import ReviewModel from "../model/review.model.js";

export const createArticlepost=async (req,res)=>{
    try {
        const newPost=new ArticleModel({
            ...req.body,
        });
        const savePost=await newPost.save();

        const reviews=await ReviewModel.find({articleID:savePost._id});
        if(reviews.length > 0){
            const totalRatting=reviews.reduce((accum,review)=>accum+review.ratting,0)
            const averageRating=totalRatting/reviews.length
            savePost.ratting=averageRating
            await savePost.save();
        }
        res.status(201).json({message:"Article created successfully."});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error creating new article"});
    }
}


export const getSingleArticle=async (req,res)=>{
    const {id} = req.params;
    try {
        const data = await ArticleModel.findById(id);
        if(!data){
            return  res.status(404).json({message:"No article with this id"});
        }

        const reviewData=await ReviewModel.find({articleID:id}).populate("userID",' username')
        if(!reviewData){
            return res.status(404).json({message:"No article with this id"});
        }
        res.status(200).json({message:"Article found successfully.",data:{data,reviewData}});
    }catch(err){
        res.status(500).json({message:"Error getting article"});
    }
}


export const getArticleQuery=async (req,res)=>{
    try {
        const {category}=req.query;
        const filter={}
        if(category && category !== 'all'){
            filter.category=category;
        }

        const totalArticle=await ArticleModel.countDocuments(filter);
        const articleData=await ArticleModel.find(filter)
        res.status(200).json({message:"Article found successfully.",data: {totalArticle,articleData}});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error getting article"});
    }
}


export const getAllArticles=async(req,res)=>{
    try {
        const data=await ArticleModel.find({}).sort({createdAt:-1});
        res.status(200).json({message:"Article list successfully.",data:data})
    }catch(err){
        res.status(500).json({message:"Error getting article"});
    }
}

export const updateArticle=async(req,res)=>{
    const {id} = req.params;
    const {title,description,image,category}=req.body
    try {
        const newData=await ArticleModel.findByIdAndUpdate(id,{
            title:title,
            description:description,
            image:image,
            category:category,
        })
        if(!newData){
            return   res.status(404).json({message:"Article not found."});
        }
        res.status(200).json({message:"Article updated successfully."});
    }catch(err){
        res.status(500).json({message:"Error updating article"});
    }
}


export const deleteArticle=async(req,res)=>{
    const {id} = req.params;
    try {
        const data=await ArticleModel.findByIdAndDelete(id)
        if(!data){
            return  res.status(404).json({message:"Article not found."});
        }

        const reviewData=await ReviewModel.deleteMany({articleID:id});
        if(!reviewData){
            return res.status(404).json({message:"Article not found."});
        }
        res.status(200).json({message:"Article deleted successfully."});
    }catch(err){
        res.status(500).json({message:"Error deleting article"});
    }
}
