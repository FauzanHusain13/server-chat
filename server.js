import express from "express"
import dotenv from "dotenv"
import authRoutes from "./app/auth/router.js"
import connectToMongoDB from "./db/connect.js"

const app = express()
const PORT = 8000

dotenv.config()
app.use(express.json())

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server running on port ${PORT}`)
})