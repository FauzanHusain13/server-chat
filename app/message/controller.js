import Conversation from "../conversation/model.js"
import Message from "./model.js"

export const getMessages = async(req, res) => {
    try {
        const { id: receiverId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }

        }).populate("messages")

        res.status(200).json(conversation.messages)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

export const sendMessage = async(req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save()
        // await newMessage.save()
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}