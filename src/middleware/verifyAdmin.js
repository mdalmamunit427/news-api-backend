export const verifyAdmin=(req,res,next)=>{
    if(req.role!=='admin'){
        return res.status(401).json({message:"Unauthorized, Access denied!"});
    }
    next();
}

