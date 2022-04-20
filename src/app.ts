import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import { ErrorHandler } from './error/ErrorHandler'


dotenv.config()
const app = express();

app.use(cors())
app.use(helmet())
app.use(express.urlencoded({ extended: false })); // body parser
app.use(express.json());



app.use(ErrorHandler.handle);