import { cartsModel } from "../../db/models/cart.models.js";

class CartManager {

    async findAll(atributes) {
        const carts = await cartsModel.find().populate("products.productId", atributes)
        return carts
    }

    async findById(id, atributes) {
        const cart = await cartsModel.findById(id).populate("products.productId", atributes)
        return cart
    }

    async createOne(obj) {
        return cartsModel.create(obj)
    }

    async addAProductInCart(cartId, productId, quantity) {
        const foundCart = await cartsModel.findById(cartId)
        const foundProduct = foundCart.products.find(
            (product) => product.productId == productId
        );
        if (foundProduct) {
            foundProduct.quantity = foundProduct.quantity + +quantity;
        } else {
            foundCart.products = [
                ...foundCart.products,
                ...[{ productId: productId, quantity: quantity }],
            ];
        }
        await foundCart.save();
        return foundCart
    } catch(error) {
        error;
    }

    async updateAProductInCart(cartId, productId, quantity) {
        const foundCart = await cartsModel.findById(cartId)
        const foundProduct = foundCart.products.find(
            (product) => product.productId == productId
        );
        if (foundProduct) {
            foundProduct.quantity = quantity;
        } else {
            foundCart.products = [
                ...foundCart.products,
                ...[{ productId: productId, quantity: 1 }],
            ];
        }
        await foundCart.save();
        return foundCart
    } catch(error) {
        error;
    }

    async deleteOne(id) {
        return cartsModel.deleteOne({ _id: id });
    }

    async deleteAProductInCart(cartId, productId) {
        try {
            const foundCart = await cartsModel.findById(cartId)
            const foundProduct = foundCart.products.find(
                (product) => product.productId == productId
            );
            if (foundProduct) {
                foundCart.products = foundCart.products.filter(
                    (product) => product.productId.toString() !== productId
                );
            }
            await foundCart.save();
            return foundCart;
        } catch (error) {
            return "Product not deleted";
        }
    }


    async resetProductsInCart(cartId) {
        try {
            const cart = await cartsManager.findById(cartId)
            const cartFiltered = cart.products
            let id
            cartFiltered.forEach(async (e) => {
                id = e.productId.id
                id = e.productId.id
                const result = await cartsManager.deleteAProductInCart(cartId, id)
                console.log(result);
            })
            return result
        } catch (error) {
            error
        }
    }
}


export const cartsManager = new CartManager();