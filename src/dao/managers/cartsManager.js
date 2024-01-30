import { cartsModel } from "../../db/models/cart.models.js";
import { productsManager } from "./productsManager.js";
import { usersManager } from "./usersManager.js";

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
        const productById = await productsManager.findById(productId)
        let netQuantity = productById.stock - quantity
        if (netQuantity < 0) {
            return "no stock"
        }
        const foundProduct = foundCart.products.find(
            (product) => product.productId == productId
        );
        if (foundProduct) {
            let netQuantityInCart = productById.stock - foundProduct.quantity
            if (netQuantityInCart < 0) {
                return "no stock"
            } else {
                foundProduct.quantity = foundProduct.quantity + +quantity;
            }
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

    async resetProductsInCart(cartId, email) {
        try {
            const deleteCart = await cartsManager.deleteOne(cartId)
            const userByEmail = await usersManager.findByEmail(email)
            const newCar = await cartsManager.createOne()
            const newCarId = newCar._id.toString()
            userByEmail.cart = newCarId
            await userByEmail.save()
            return newCar
        } catch (error) {
            error
        }
    }

    async deleteAllProducts(cartId) {
        try {
            const foundCart = await cartsModel.findById(cartId)
            foundCart.products = []
            await foundCart.save()
            return foundCart

        } catch (error) {
            error
        }
    }
}


export const cartsManager = new CartManager();