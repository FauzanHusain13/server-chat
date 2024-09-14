import express from "express"
import { loginUser, logoutUser, signUpuser } from "./controller.js"
const router = express.Router()

router.get("/signup", signUpuser)
router.get("/login", loginUser)
router.get("/logout", logoutUser)

export default router