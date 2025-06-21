import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../../index.js";

export const verifyToken = (req, res, next) => {
    try {
      let token;
  
      // Try Authorization header
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
  
      // Try cookies
      if (!token && req.cookies.token) {
        token = req.cookies.token;
      }
  
      if (!token) {
        return res.status(401).json({ message: "Unauthorized Access! Token missing." });
      }
  
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!decoded.userID) {
        return res.status(401).json({ message: "Unauthorized Access!" });
      }
  
      req.userID = decoded.userID;
      req.role = decoded.role;
      next();
    } catch (e) {
      console.error("Token verification error:", e);
      return res.status(401).json({ message: "Invalid Token!" });
    }
  };
  