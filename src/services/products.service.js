import { productsManager } from "../dao/managers/productsManager.js";

const findAll = () => {
    const result = productsManager.findAll()
    return result
}

const find = () => {
    const result = productsManager.find()
    return result
}

const findByCategory = () => {
    const result = productsManager.findByCategory(category, opt)
    return result
}

const findByPrice = (price, opt) => {
    const result = productsManager.findByPrice(price, opt)
    return result
}

const findAgregationByCategoryAndPrice = (category, price, opt) => {
    const result = productsManager.findAgregationByCategoryAndPrice(category, price, opt)
    return result
}

const findById = (id) => {
    const result = productsManager.findById(id)
    return result
}

const createOne = (obj) => {
    const result = productsManager.createOne(obj)
    return result
}

const updateOne = (id, obj) => {
    const result = productsManager.updateOne({ _id: id }, obj)
    return result
}

const deleteOne = (id) => {
    const result = productsManager.deleteOne(id)
    return result
}

const obj = {
    findAll,
    find,
    findByCategory,
    findByPrice,
    findAgregationByCategoryAndPrice,
    findById,
    createOne,
    updateOne,
    deleteOne
}

export default obj