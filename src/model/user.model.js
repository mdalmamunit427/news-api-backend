import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profileImage:{type:String},
    role:{type:String,default:'user'},
    bio:{type:String, maxLength:200},
    profession:{type:String},
    createdAt:{type:Date,default:Date.now},
},{ timestamps: true});

const UserModel=mongoose.model("User",userSchema);
export default UserModel;