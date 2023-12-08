import mongoose, { Schema, model } from "mongoose";

const orderSchema = new mongoose.Schema({
    code: {
        type: Number,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
    },
    products_quantity: {
        type: Number,
        required: true,
    },
    products_price: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
    timestampt: {
        createdAt: { type: Date, default: Date.now },
    }

})
export const orderModel = model('Orders', orderSchema)
