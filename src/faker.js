import { faker } from "@faker-js/faker"

export const generateArrayProduct = (quantityProducts) => {
    const products = []
    for (let i = 0; i < quantityProducts; i++) {
        const product = genererateProduct()
        products.push(product)
    }
    return products
}

const genererateProduct = () => {
    const product = {
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.product(),
        price: faker.commerce.price({ min: 100, max: 1000, dec: 0 }),
        category: faker.commerce.department(),
        stock: faker.number.int({ max: 100 }),
    }
    return product
}