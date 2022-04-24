import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { ErrorHandler } from './middleware/error/ErrorHandler'
import userRouter from './router/UserRouter'
import authRouter from './router/AuthRouter'
import mongoose from 'mongoose'
import "reflect-metadata"; // for typedi


const app = express();

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: false })); // body parser
app.use(express.json());

app.use('/users', userRouter)
app.use('/auth', authRouter)

app.use(ErrorHandler.notFound)
app.use(ErrorHandler.internal);

mongoose.connect(process.env.DB_CONNECTION_STRING!).then(() => {
    const server = app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is Running on Port ${process.env.PORT || 3000}`);
    })
}).catch(console.log)

export default app


