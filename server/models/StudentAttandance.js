import mongoose from "mongoose";

const studentAttendanceSchema = new mongoose.Schema({
    date: String,
    facultyId: Number,
    presenties: Array({
        name: String,
        enrollno: String
    }),
    leaves: Array({
        name: String,
        enrollno: String,
        reason: String
    }),
    remark: Object
});


const StudentAttendance = mongoose.model("StudentAttendance", studentAttendanceSchema);

export default StudentAttendance;

