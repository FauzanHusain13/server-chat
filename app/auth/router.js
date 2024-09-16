import express from "express"
import { loginUser, logoutUser, signUpuser } from "./controller.js"
const router = express.Router()

router.post("/signup", signUpuser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)

export default router