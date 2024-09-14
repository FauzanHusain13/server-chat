export const signUpuser = (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body
    } catch (error) {
        
    }
}
export const loginUser = (req, res) => {
    console.log("Login")
}
export const logoutUser = (req, res) => {
    console.log("Logout")
}