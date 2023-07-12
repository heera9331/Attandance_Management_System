import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    enrollno: String,
    admissionYear: Number,
    isAdmin: Boolean,
    city: String,
    address: String,
    course: String,
    branch: String,
    username: String,
    password: String
});

const Student = mongoose.model("Student", studentSchema);

export default Student;