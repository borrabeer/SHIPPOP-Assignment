import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createAt: { type: Date, default: Date.now }
})

export const UserModel = mongoose.model("User", UserSchema);

export default UserModel;