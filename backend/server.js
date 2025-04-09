import express from "express"
import dotenv from "dotenv"
import modelRoutes from './routes/model.route.js'
import { connectDb } from "./lib/db.js"

const app = express()
dotenv.config()

app.use(express.json({ limit: "50mb" }))

app.use('/api/models', modelRoutes)

app.listen(2000,()=>{
    console.log("server is running")
    connectDb()
})