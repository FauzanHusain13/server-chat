import User from "../user/model.js"
import bcrypt from "bcryptjs"
import validator from "validator"

export const signUpuser = async(req, res) => {
    try {
        const { username, email, password, confirmPassword, gender } = req.body

        // cek duplikat username
        const user = await User.findOne({ username })
        if(user) {
            return res.status(400).json({ error: "sername already exists!" })
        }

        // cek email
        const checkEmail = await validator.isEmail(email)
        if(!checkEmail) {
            return res.status(400).json({ error: "email not valid!" })
        }

        // cek password dan confirmPassword
        if(password !== confirmPassword) {
            return res.status(400).json({ error: "password don't match!" })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // sesuaikan username dengan profilePic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser) {
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: "Inavalid user data" })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}
export const loginUser = (req, res) => {
    console.log("Login")
}
export const logoutUser = (req, res) => {
    console.log("Logout")
}