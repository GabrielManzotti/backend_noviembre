import { usersModel } from "../../db/models/users.models.js"
class UsersManager {

    async findAll() {
        const result = await usersModel.find()
        return result
    }

    async findById(id) {
        const result = await usersModel.findById(id).populate("cart")
        return result
    }

    async findByEmail(email) {
        const result = await usersModel.findOne({ email })
        return result
    }

    async createOne(obj) {
        const result = await usersModel.create(obj)
        return result
    }

    async deleteOne(id) {
        const result = await usersModel.deleteOne({ _id: id })
        if (result.deletedCount === 1) {
            return result
        } else {
            return "User not found"
        }
    }

    async updateRole(role, userId) {
        role = role
        userId = userId
        try {
            const result = await usersModel.findById(userId)
            result.role = role
            await result.save();
            return result.role
        } catch (error) {
            return error
        }
    }

    async countUsersByRole(role) {
        role = role
        const result = await usersModel.aggregate([
            { $match: { role: role } },
            { $count: "Total users with the role" },
        ])
        return result
    }

    async getAdminsUsers() {
        let role = 'admin'
        const result = await usersModel.aggregate([
            { $match: { role: role } },
        ])
        return result
    }

    async countUsers() {
        const result = await usersModel.aggregate([
            { $count: "Total users in database" },
        ])
        return result
    }

    async deleteUsersByTime() {
        let lastConecction
        let fechaHoraActual = new Date();
        let diferenciaZonaHoraria = -(3 * 60);
        fechaHoraActual.setMinutes(fechaHoraActual.getMinutes() + diferenciaZonaHoraria);
        fechaHoraActual.setMinutes(fechaHoraActual.getMinutes() - 30);
        console.log(fechaHoraActual);
        try {
            const users = await usersModel.find()
            users.forEach(async (e, index) => {
                lastConecction = new Date(e.last_connection.date)
                lastConecction.setHours(lastConecction.getHours() - 3)
                if (lastConecction < fechaHoraActual) {
                    await usersModel.deleteOne({ _id: e.id })
                }
            })
            return "users deleted succesfully"
        } catch (error) {
            return error
        }
    }

}

export const usersManager = new UsersManager()