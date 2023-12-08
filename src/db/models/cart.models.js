import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const CartSchema = new mongoose.Schema({
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    default: []
});

CartSchema.plugin(mongoosePaginate)
export const cartsModel = model("Cart", CartSchema);


// import { Schema, model } from "mongoose";
// import mongoosePaginate from 'mongoose-paginate-v2'

// const cartSchema = new Schema({

//     products: {
//         type: [{ productId: String, quantity: Number }],
//         require: true,
//         ref: 'Products'
//     },
// })

// cartSchema.plugin(mongoosePaginate)
// export const cartsModel = model("Cart", cartSchema);