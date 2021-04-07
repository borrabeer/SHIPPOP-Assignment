import mongoose from "mongoose";

const { Schema } = mongoose;

const RatingSchema = new Schema({
    bookId: { type: String, required: true, index: true, ref: 'Book' },
    userId: { type: String, required: true, index: true, ref: 'User' },
    score: { type: Number, required: true, min: 1, max: 5 }
})

export const RatingModel = mongoose.model("Rating", RatingSchema);

export default RatingModel;