import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Cart"
    },
    role: {
        type: String,
        default: "user"
    },
    from_github: {
        type: Boolean,
        default: false
    },
    from_google: {
        type: Boolean,
        default: false
    },
    last_connection: {
        date: { type: String },
        action: { type: String, enum: ["login", "logout"] }
    },
    documents: [{
        name: {
            type: String,
        },
        reference: {
            type: String
        }
    }]
})
export const usersModel = mongoose.model('Users', usersSchema)