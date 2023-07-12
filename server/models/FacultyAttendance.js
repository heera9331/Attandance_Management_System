import mongoose from "mongoose";

const facultyAttendanceSchema = new mongoose.Schema({
    date: String,
    presenties: Array({
        facultyId: Number,
        name: String
    }),
    leaves: Array({
        facultyId: Number,
        name: String,
        Reason: String
    }),
    remark: Object
});

const FacultyAttendance = mongoose.model("FacultyAttendance", facultyAttendanceSchema);

export default FacultyAttendance;