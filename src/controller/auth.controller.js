import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../middleware/generateToken.js";


export const Register=async (req,res)=>{
    const {username,email,password}=req.body;

    if(!username || !email || !password || username === "" || email === "" || password === ""){
        return res.status(401).json({error:"Please fields are required"});
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser=new UserModel({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save();
        res.status(200).json({message:"Successfully SigngUP"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Something went wrong"});
    }
}


export const Login=async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password || email === "" || password === ""){
        return res.status(401).json({error:"Please fields are required"});
    }
    try {
        const user=await UserModel.findOne({email})
        if(!user){
            return res.status(401).json({error:"User not found"});
        }
        const Validpassowrd=await bcrypt.compare(password,user.password)
        if(!Validpassowrd){
            return res.status(401).json({error:"User not found"});
        }
        const token=await generateToken(user._id)
        res.cookie('token',token,{httpOnly:true,secure:true,sameSite:'none'});
        res.status(200).json({message:"Successfully Login",token,user:{
                _id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Something went wrong"});
    }
}



export const userLogout=async(req,res)=>{
    try {
        res.clearCookie('token');
        res.status(200).json({message:"Successfully Logout"});
    }catch(e){
        console.log(e);
        res.status(500).json({error:"Something went wrong"});
    }
}

