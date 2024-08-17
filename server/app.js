import express from 'express'
import authRouter from  './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import 'dotenv/config'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app= express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173", credentials:true}));

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/posts',postRouter);

const url='mongodb+srv://kj866795:LLCRlbvOJCFXkJjd@cluster0.hah8tdn.mongodb.net/estate_app?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(url)
.then(console.log('connected'))
.catch(error=>console.log(error.message));

const PORT=process.env.PORT ;
app.listen(PORT,()=>
{
    console.log(`Server is running at port ${PORT} `);
})