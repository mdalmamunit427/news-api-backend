import UserModel from '../model/user.model.js'
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from "../../index.js";


const generateToken =async (userID) => {
    try {
        const user=await UserModel.findById(userID)
        if(!user){
            throw new Error("User not found")
        }
        const token=jwt.sign({userID:user._id,role:user.role},JWT_SECRET,{expiresIn: '72h'})
        return token
    }catch(err) {
        console.error(err)
        throw err;
    }
}

export default generateToken;