import UserModel from "../model/user.model.js";

export const getSingleUser=async(req,res)=>{
    const {id}=req.params;
    try {
        const user=await UserModel.findById(id)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json({message:"User founded successfully",data:user})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

export const getAllusers=async(req,res)=>{
    try {
        const user=await UserModel.find({}).sort({createdAt:-1})
        res.status(200).json({message:"User founded successfully",data:user})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}


export const deleteUser=async(req,res)=>{
    const {id}=req.params;
    try {
        const user=await UserModel.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json({message:"User deleted successfully"})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}


export const updateUser=async(req,res)=>{
    const {id}=req.params;
    const {username,profession,bio,profileImage}=req.body
    try {
        const user=await UserModel.findByIdAndUpdate(id,{
            username:username,
            profession:profession,
            bio:bio,
            profileImage:profileImage
        },{new:true})
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json({message:"User updated successfully"})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}


export const updateUserRole=async(req,res)=>{
    const {id}=req.params;
    const {role}=req.body;
    try {
        const user=await UserModel.findByIdAndUpdate(id,{
            role:role,
        },{new:true})
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json({message:"User role updated successfully"})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}