import morgan from "morgan";
import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user";
import dbConnection from "./src/utils/dbConnection";
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false,  limit: '50mb'}))
app.use(morgan("dev"))
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}))

dbConnection()

app.use(cookieParser())
app.use('/api', userRouter)

app.listen(4000, () => {console.log("Connected Successfully to Server");})