import obj from "../services/users.service.js";

const deleteAUser = async (req, res) => {
    const { idUser } = req.params
    try {
        const result = await obj.deleteOne(idUser)
        if (result === "User not found") {
            return res.status(404).json({ message: "user not found" })
        } else {
            return res.status(200).json({ message: "User deleted", User: result })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const countUsersByRoleController = async (req, res) => {
    const { role } = req.body
    if (!role) {
        return res.status(400).json({ message: 'Role is missing' })
    }
    try {
        const result = await obj.countUsersByRole(role)
        return res.status(200).json({ message: "Result", Users: result })
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const countUsersController = async (req, res) => {
    try {
        const result = await obj.countUsers()
        return res.status(200).json({ message: "Users", Users: result })
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const updateRoleController = async (req, res) => {
    const { role, userId } = req.body
    if (!role || !userId) {
        return res.status(400).json({ message: 'Some data is missing' })
    }
    if (role !== "user" && role !== "admin" && role !== "premium") {
        return res.status(400).json({ message: 'Role format not allowed' })
    }
    const userExist = await obj.findById(userId)
    if (!userExist) {
        return res.status(400).json({ message: 'No user found' })
    }
    try {
        const result = await obj.updateRole(role, userId)
        return res.status(200).json({ message: `The role has been updated for the ${userId} user`, NewRole: result })
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const findUserById = async (req, res) => {
    const { idUser } = req.params
    try {
        const user = await obj.findById(idUser)
        res.status(200).json({ message: "User found", user })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const getAdminsUsers = async (req, res) => {
    try {
        const result = await obj.getAdminsUsers()
        return res.status(200).json({ message: "Admins", users: result })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const findByEmail = async (req, res) => {
    const { email } = req.params
    try {
        const result = await obj.findByEmail(email)
        if (result) {
            return res.status(200).json({ message: "User", user: result })
        } else {
            return res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

const deleteUsersByTime = async (req, res) => {
    try {
        const users = await obj.deleteUsersByTime()
        res.status(200).json({ message: "Users deleted succesfully", users: users })
    } catch (error) {
        res.status(500).json({ error })
    }
}



const objCtrollers = {
    deleteAUser,
    countUsersByRoleController,
    countUsersController,
    updateRoleController,
    findUserById,
    getAdminsUsers,
    findByEmail,
    deleteUsersByTime
}

export default objCtrollers