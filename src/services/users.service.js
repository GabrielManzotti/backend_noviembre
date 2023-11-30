import { usersManager } from "../dao/managers/usersManager.js";

const findById = (id) => {
    const result = usersManager.findById(id)
    return result
}

const findByEmail = (email) => {
    const result = usersManager.findOne(email)
    return result
}

const createOne = (obj) => {
    const result = usersManager.createOne(obj)
    return result
}

const deleteOne = (id) => {
    const result = usersManager.deleteOne(id)
    return result
}

const updateRole = (role, userId) => {
    const result = usersManager.updateRole(role, userId)
    return result
}

const countUsersByRole = (role) => {
    const result = usersManager.countUsersByRole(role)
    return result
}

const countUsers = () => {
    console.log("llega a service");
    const result = usersManager.countUsers()
    return result
}

const obj = {
    findById,
    findByEmail,
    createOne,
    deleteOne,
    updateRole,
    countUsersByRole,
    countUsers
}

export default obj