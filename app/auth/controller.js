import User from "../user/model.js"
import bcrypt from "bcryptjs"
import validator from "validator"
import generateSetTokenAndSetCookie from "../../utils/generateToken.js"

export const signUpuser = async(req, res) => {
    try {
        const { username, email, password, confirmPassword, gender } = req.body

        // cek duplikat username
        const user = await User.findOne({ username })
        if(user) {
            return res.status(400).json({ message: "username sudah ada!" })
        }

        // cek email
        const checkEmail = await validator.isEmail(email)
        if(!checkEmail) {
            return res.status(400).json({ message: "email tidak valid!" })
        }

        // cek password dan confirmPassword
        if(password !== confirmPassword) {
            return res.status(400).json({ message: "password dan konfirmasi password tidak sama!" })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // sesuaikan username dengan profilePic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            username: username.toLowerCase(),
            email,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser) {
            generateSetTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ message: "Inavalid user data" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}
export const loginUser = async(req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid username or password" })
        }

        generateSetTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}
export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}