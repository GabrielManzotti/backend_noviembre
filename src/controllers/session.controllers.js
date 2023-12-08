import objSerevice from "../services/session.service.js";

const sessionUser = async (req, res) => {
    const currentUser = req.user
    try {
        if (currentUser) {
            const result = await objSerevice.currentSession(currentUser)
            return res.status(200).json({ message: "Current user", User: result })
        } else {
            return res.status(400).json({ message: "No user login" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const obj = {
    sessionUser
}

export default obj