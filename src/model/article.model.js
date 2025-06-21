import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String},
    category: {type: String},
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true});

const ArticleModel=mongoose.model("Article",articleSchema);
export default ArticleModel;