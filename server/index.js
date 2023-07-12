import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';

import mongoose from "mongoose";
import connectDB from "./database/db.js";

// models
import User from "./models/User.js";
import Student from "./models/Student.js";
import FacultyAttendance from "./models/FacultyAttendance.js";
import StudentAttendance from "./models/StudentAttandance.js"

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors());
app.use(express.json());


// app.use('/', Router);
app.get('/', function (req, res, next) {
  res.json({ msg: "success" });
});

app.post('/login', async (req, res, next) => {
  const email = req.body.username;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  const result = await User.findOne({ email: email });

  if (result != null && result.email === email && result.password === password) {
    const students = await Student.find({});
    let data = []
    for (let i = 0; i < students.length; i++) {
      let tmp = { name: students[i].name, enrollno: students[i].enrollno }
      data.push(tmp);
    }
    res.json({ success: true, facultyId: result.facultyId, data: data });
  } else {
    res.json({ success: false });
  }
})



app.post('/studentAttendance', async (req, res, next) => {
  let date = new Date().toLocaleDateString();
  let data = { ...req.body, date };
  console.log(data);

  // check if attendance is already filled
  let dateResult = await FacultyAttendance.findOne({ date: date });

  // fill faculty attendance
  if (dateResult != null) {
    res.json({ success: false, msg: "attendance is already filled" });
    return;
  }
  const facultyId = data.facultyId;
  let result = await User.findOne({ facultyId: facultyId })
  const fname = result.name;
  const note = data.remark;

  let fattendanceResult = await FacultyAttendance.insertMany({ date: date, presenties: [{ facultyId: facultyId, name: fname }], remark: note, leaves: [] });

  // fill student attendance
  let sAttendanceResult = await StudentAttendance.insertMany([{ date: date, facultyId: facultyId, presenties: data.presenties, leaves: data.leaves, remark: note }])

  if (fattendanceResult && sAttendanceResult) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
})


const createNewUser = async () => {
  const newUser = new User({
    name: "shiva",
    facultyId: 101,
    email: "shiva123@gmail.com",
    password: "shiva@123",
    isAdmin: false
  });

  console.log(await newUser.save());
}

const insertNewStudent = async () => {
  const student1 = new Student({
    name: "Abhay",
    enrollno: "0610CS20101",
    admissionYear: 2020,
    isAdmin: false,
    city: "Sagar",
    address: "Khejra Bagh, Sagar, MP",
    course: "Btech",
    branch: "CSE",
    username: "abhay@gmail.com",
    password: "abhay@123"
  });
  console.log(await student1.save());
}

const insertFacultyAttendance = () => {
  const newAttendance = new FacultyAttendance({
    date: "10/07/2023",
    presenties: [{ facultyId: 101, name: "Shiva" }],

    leave: [{ facultyId: 102, name: "Vishal", reason: "Health Issue" }],
    remark: ["remark1", "remark2"]
  });

  // newAttendance.save();
}

const insertStudentAttendance = () => {
  const newStudentAttendance = new StudentAttendance({
    date: "10/07/2023",
    teacherID: 101,
    presenties: [
      {
        name: "Heera",
        enrollno: "0610CS201030"
      }
    ],

    leave: [
      {
        name: "Abhay",
        enrollno: "0610CS201001",
        reason: "Health"
      }
    ],

    remark: [
      "Good"
    ]
  });

  newStudentAttendance.save();
}


const PORT = 8000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server has started on port ${PORT}`);
    connectDB();
    // insertFacultyAttendance();
    // insertStudentAttendance();
  } else {
    console.log(err);
  }
});

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
// // Connection(username, password);
