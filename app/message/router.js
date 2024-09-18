import express from "express"
const router = express.Router()

import { getMessages, sendMessage } from "./controller.js"
import protectRoute from "../../middleware/protectRoute.js"

router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, sendMessage)

export default router