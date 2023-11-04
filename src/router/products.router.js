import { Router } from 'express'
//FILE SYSTEM
// import { productManager } from '../dao/entities/script2doEntregable.js'
import { productsManager } from '../dao/managers/productsManager.js'
const router = Router()

router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail, } = req.body
    if (!title || !description || !price || !code || !stock || !status || !category) {
        return res.status(400).json({ message: 'Some data is missing' })
    }
    try {
        const createdProduct = await productsManager.createOne(req.body)
        res.status(200).json({ message: "product created", user: createdProduct })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
)

router.get('/', async (req, res) => {
    try {
        const products = await productsManager.findAll(req.query)
        if (products) {
            return res.status(200).json({ message: "products", Products: products })
        } else {
            return res.status(404).json({ message: "no found produducts" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})

router.get('/category/:category/price/:price', async (req, res) => {
    let category = req.params.category
    let price = req.params.price
    try {
        const result = await productsManager.findByCategory(category, price, req.query)
        if (result) {
            return res.status(200).json({ message: "Product", Products: result })
        } else {
            return res.status(400).json({ message: "no found produducts" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})

router.get('/price/:price', async (req, res) => {
    const { price } = req.params
    try {
        const products = await productsManager.findByPrice(price, req.query)
        if (products) {
            return res.status(200).json({ message: "Products", Products: products })
        } else {
            return res.status(404).json({ message: "no found produducts" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})

router.get('/:idProduct', async (req, res) => {
    const { idProduct } = req.params
    try {
        const product = await productsManager.findById(idProduct)

        if (product) {
            return res.status(200).json({ message: "Product", Product: product })
        } else {
            return res.status(400).json({ message: "no found produducts" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})

router.get('/category/:category', async (req, res) => {
    const { category } = req.params
    try {
        const result = await productsManager.findByCategory(category, req.query)

        if (result) {
            return res.status(200).json({ message: "Product", Products: result })
        } else {
            return res.status(400).json({ message: "no found produducts" })
        }
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})

router.put('/update/:idProduct', async (req, res) => {
    const { idProduct } = req.params
    try {
        const updatedProduct = await productsManager.updateOne(idProduct, req.body)
        return res.status(200).json({ message: "Product updated", Product: updatedProduct })
    } catch (error) {
        return res.status(500).json({ message: "error!" })
    }
})

router.delete('/delete/:idProduct', async (req, res) => {
    const { idProduct } = req.params
    try {
        const deletedProduct = await productsManager.deleteOne(idProduct);
        return res.status(200).json({ message: "Product deleted", Product: deletedProduct })
    } catch (error) {
        res.status(500).json({ message: "error!" })
    }
})

//--------------------------------------------------------------------//
//FILE SYSTEM
//router con fileSystem
// router.get('/', async (req, res) => {
//     try {
//         const products = await productManager.getProducts(req.query)
//         if (!products) {
//             res.status(400).json({ message: 'No products found' })
//         } else {
//             res.status(200).json({ message: 'Products found', products })
//         }
//     } catch (error) {
//         res.status(500).json({ message: "error!" })
//     }
// })


// router.get('/:pid', async (req, res) => {
//     const { pid } = req.params
//     try {
//         const product = await productManager.getProductsById(+pid)
//         if (!product) {
//             res.status(400).json({ message: 'product no found wiht te id' })
//         }
//         else {
//             res.status(200).json({ message: 'product found', product })
//         }
//     } catch (error) {

//     }
// })

// router.post('/', async (req, res) => {
//     const { title, description, code, price, status, stock, category, thumbnail, } = req.body
//     if (!title || !description || !price || !code || !stock || !status || !category) {
//         return res.status(200).json({ message: 'Some data is missing' })
//     }
//     try {
//         const newProduct = await productManager.addProduct(req.body)
//         res.status(200).json({ message: 'Product created', product: newProduct })
//     } catch (error) {
//         res.status(500).json({ message: error })
//     }
// }
// )

// router.delete('/delete/:pid', async (req, res) => {
//     const { pid } = req.params
//     try {
//         const deleteProduct = await productManager.deleteProductByID(+pid)
//         if (deleteProduct === "no existe el producto") {
//             res.status(400).json({ message: 'product no exists' })
//         }
//         else {
//             res.status(200).json({ message: 'The product was delete', product: deleteProduct })
//         }
//     } catch (error) {
//         res.status(500).json({ message: error })
//     }
// }
// )

// router.put('/update/:pid', async (req, res) => {
//     const { pid } = req.params
//     const { title, description, price, thumbnail, stock, status, category } = req.body
//     const updateProduct = await productManager.updateProductByID(+pid, req.body)
//     try {
//         if (updateProduct === "no existe el producto") {
//             return res.status(400).json({ message: 'product no exists' })
//         }
//         else {
//             return res.status(200).json({ message: 'product update succesfully' })
//         }
//     }
//     catch (error) {
//         res.status(500).json({ message: error })
//     }
// }
// )

export default router