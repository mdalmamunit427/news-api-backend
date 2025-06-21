import express from "express";
import {Login, Register, userLogout} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register",Register)
router.post("/login",Login)
router.post('/logout',userLogout)

export default router;