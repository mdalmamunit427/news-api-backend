import express from 'express';
import {deleteUser, getAllusers, getSingleUser, updateUser, updateUserRole} from "../controller/user.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {verifyAdmin} from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get('/get-singleuser/:id',verifyToken,getSingleUser)
router.get('/get-alluser',getAllusers)
router.delete('/delete-user/:id',verifyToken,verifyAdmin,deleteUser)
router.post('/update-user/:id',verifyToken,updateUser)
router.post("/update-user-role/:id",updateUserRole)

export default router;