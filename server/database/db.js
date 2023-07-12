import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/CollegeDB', { useNewUrlParser: true });
}

export default connectDB;