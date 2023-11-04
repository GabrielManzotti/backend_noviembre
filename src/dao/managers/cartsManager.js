import { cartsModel } from "../../db/models/cart.models.js";

class CartManager {

    async findAll(atributes) {
        const carts = await cartsModel.find().populate("products.productId", atributes)
        return carts
    }

    async findById(id, atributes) {
        return cartsModel.findById(id).populate("products.productId", atributes)
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
                ...[{ productId: productId, quantity: 1 }],
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
}

export const cartsManager = new CartManager();