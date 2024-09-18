import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./app/auth/router.js"
import messageRoutes from "./app/message/router.js"
import userRoutes from "./app/user/router.js"

import connectToMongoDB from "./db/connect.js"

const app = express()
const PORT = 8000

dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server running on port ${PORT}`)
})