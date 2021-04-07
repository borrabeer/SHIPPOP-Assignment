import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
    bookId: { type: String, required: true, index: true, ref: 'Book' },
    amount: { type: Number, required: true, default: 1 }
})

const CartSchema = new Schema({
    userId: { type: String, required: true, index: true, ref: 'Author' },
    products: [ProductSchema]
})

export const CartModel = mongoose.model("Cart", CartSchema);

export default CartModel;