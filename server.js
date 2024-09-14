import express from "express"
import dotenv from "dotenv"
import authRoutes from "./app/auth/router.js"

const app = express()

dotenv.config()
const PORT = 8000

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.use("/api/auth", authRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))