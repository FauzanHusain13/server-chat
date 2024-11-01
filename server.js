import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./app/auth/router.js"
import messageRoutes from "./app/message/router.js"
import userRoutes from "./app/user/router.js"

import connectToMongoDB from "./db/connect.js"
import cors from "cors"
import { app, server } from "./socket/socket.js"

const PORT = 8000
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server running on port ${PORT}`)
})