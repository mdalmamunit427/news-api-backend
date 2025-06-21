import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();

app.use(cors({
    origin: ["http://localhost:5173","https://test-news-client.vercel.app"],
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5001;
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY;


async function main(){
    await mongoose.connect(process.env.UB_URL);

    app.get('/', (req, res) => {
        res.send('Welcome to the Shopping App!');
    })
}
main().then(()=>console.log("mongoDB connected")).catch(err => console.log(err));

import authRoute from "./src/route/auth.route.js"
import userRoute from "./src/route/user.route.js"
import reviewRoute from "./src/route/review.route.js"
import articleRoute from "./src/route/article.route.js"
import stateRoute from "./src/route/state.route.js"

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/review",reviewRoute)
app.use("/api/article",articleRoute)
app.use("/api/state",stateRoute)

import uploadImage from "./src/utilitis/uploadImage.js"
app.post('/uploadImage',async (req,res)=>{
    await uploadImage(req.body.image).then((url)=>res.send(url)).catch((err)=>res.status(500).send(err))
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})