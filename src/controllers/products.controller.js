import objService from "../services/products.service.js";

const createProduct = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail, } = req.body
    if (!title || !description || !price || !code || !stock || !status || !category) {
        return res.status(400).json({ message: 'Some data is missing' })
    }
    try {
        const createdProduct = await objService.createOne(req.body)
        res.status(200).json({ message: "product created", product: createdProduct })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const findAllProducts = async (req, res) => {
    try {
        const products = await objService.findAll(req.query)
        if (products) {
            return res.status(200).json({ message: "products", Products: products })
        } else {
            return res.status(404).json({ message: "no found produducts" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const findProductsByCategoryAndPrice = async (req, res) => {
    let category = req.params.category
    let price = req.params.price
    try {
        const result = await objService.findAgregationByCategoryAndPrice(category, price, req.query)
        if (result) {
            return res.status(200).json({ message: "Product", Products: result })
        } else {
            return res.status(400).json({ message: "no found produducts" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const findProductByPrice = async (req, res) => {
    const { price } = req.params
    try {
        const products = await objService.findByPrice(price, req.query)
        if (products) {
            return res.status(200).json({ message: "Products", Products: products })
        } else {
            return res.status(404).json({ message: "no found produducts" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const findProductById = async (req, res) => {
    const { idProduct } = req.params
    try {
        const product = await objService.findById(idProduct)

        if (product) {
            return res.status(200).json({ message: "Product", Product: product })
        } else {
            return res.status(400).json({ message: "no found produducts" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const findProductByCategory = async (req, res) => {
    const { category } = req.params
    try {
        const result = await objService.findByCategory(category, req.query)

        if (result) {
            return res.status(200).json({ message: "Product", Products: result })
        } else {
            return res.status(400).json({ message: "no found produducts" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const updateProduct = async (req, res) => {
    const { idProduct } = req.params
    try {
        const updatedProduct = await objService.updateOne(idProduct, req.body)
        return res.status(200).json({ message: "Product updated", Product: updatedProduct })
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
}

const deleteProduct = async (req, res) => {
    const { idProduct } = req.params
    console.log(idProduct);
    try {
        const deletedProduct = await objService.deleteOne(idProduct);
        return res.status(200).json({ message: "Product deleted", Product: deletedProduct })
    } catch (error) {
        res.status(500).json({ message: "error!" })
    }
}

const obj = {
    createProduct,
    findAllProducts,
    findProductsByCategoryAndPrice,
    findProductByPrice,
    findProductById,
    findProductByCategory,
    updateProduct,
    deleteProduct
}

export default obj