import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema({
    userId: { type: String, required: true, index: true, ref: 'User' },
    name: { type: String, required: true },
    productType: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    barcode: { type: String, required: true },
    category: [
        { type: String },
    ],
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String },
    hidden: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now() },
})

export const BookModel = mongoose.model("Book", BookSchema);

export default BookModel;