import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    facultyId: Number,
    email: String,
    password: String,
    isAdmin: Boolean
});


const User= mongoose.model("User", userSchema);

export default User;