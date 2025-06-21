import express from "express";
import {
    createArticlepost,
    deleteArticle,
    getAllArticles, getArticleQuery,
    getSingleArticle,
    updateArticle
} from "../controller/article.controller.js";
import {verifyToken} from "../middleware/verifyToken.js";
import {verifyAdmin} from "../middleware/verifyAdmin.js";
const router = express.Router();

router.post("/creat-post",verifyToken,verifyAdmin,createArticlepost)
router.get("/getall-post",getAllArticles)
router.get("/get-query",getArticleQuery)
router.get("/getsingle-post/:id",getSingleArticle)
router.post("/update-post/:id",verifyToken,verifyAdmin,updateArticle)
router.delete("/delete-post/:id",verifyToken,verifyAdmin,deleteArticle)

export default router;