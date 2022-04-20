import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import { ErrorHandler } from './error/ErrorHandler'
import userRouter from './router/User'
import mongoose from 'mongoose'


dotenv.config()
const app = express();

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: false })); // body parser
app.use(express.json());

app.use('/users', userRouter)

app.use(ErrorHandler.notFound)
app.use(ErrorHandler.internal);


mongoose.connect(process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/Mydb").then(() =>{
    const server = app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is Running on Port ${process.env.PORT || 3000}`);
    })
}).catch(console.log)


