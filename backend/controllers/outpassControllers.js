// const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Outpass = require("../models/outpassModel");
const User = require("../models/userModel");
const uuid = require("uuid");
// mongoose.model(User,'User' );

// const ObjectId = require('mongoose').Types.ObjectId;
// const { find } = require("../models/outpassModel");

const pendingOutpass = asyncHandler(async (req, res) => {
  //getting data from user
  // const { name, email, password, pic } = req.body;

  // const outpasses = await Outpass.find({});
  // console.log('Controllers',outpassees);
  // res.json(outpasses);

  // chk if user aready exist
  await Outpass.find({ studentId: req.params.id })
    // await Outpass.find({ status:"REQUESTED" })
    .then((outpasses) => {
      if (outpasses.length) {
        console.log(outpasses);
        res.json(outpasses);
      } else {
        res.json({
          status: "FAILED",
          message: "No pending outpassees",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: "FAILED",
        message: "An error occured while checking for pending outpasses",
      });
    });
});

const pendingOutpassStudent = asyncHandler(async (req, res) => {
  // const  studentId  = req.body;
  // console.log("req.body: ",req.body);
  // console.log("Controler studentID : ", studentId);
  // sabari udaiya student id

  // await Outpass.find({ studentId: "64583dd6b2ef8413104f28c5" })
  const objectId = req.query.objectId;
  console.log("Controller pendingOutpassStudent objectID : ", objectId);
  await Outpass.find({
    // status: { $in: ["REQUESTED1", "REQUESTED2"] },
    studentId: objectId,
  })
    .then((outpasses) => {
      if (outpasses.length) {
        res.json(outpasses);
      } else {
        res.json({
          message: "No pending outpassees",
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "An error occured while checking for pending outpasses",
      });
    });
});

const pendingOutpassFaculty = asyncHandler(async (req, res) => {
  const objectId = req.query.objectId;
  console.log("Controller pendingOutpassFaculty objectId: ", objectId);
  try {
    const outpasses = await Outpass.find({
      status: "REQUESTED2",
      classInchargeId: objectId,
    })
      .populate("studentId") // Use the correct field name that references the User model
      .exec();

    if (outpasses.length) {
      res.json(outpasses);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log(error);
    res.json("An error occurred while checking for pending outpasses");
  }
});

const pendingOutpassWarden = asyncHandler(async (req, res) => {
  const objectId = req.query.objectId;
  console.log("Controler pendingOutpassWarden objectId: ", objectId);
  try {
    const outpasses = await Outpass.find({
      status: "REQUESTED1",
      wardenId: objectId,
    })
      .populate("studentId") // Replace "studentId" with the correct field name/path
      .exec();

    if (outpasses.length > 0) {
      res.json(outpasses);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while checking for pending outpasses",
    });
  }
});

const insertOutpass = asyncHandler(async (req, res) => {
  // var studentId = await User.find({email:"sabarivasanv@gmail.com"});
  const { studentId, from, to, reason, place } = req.body;
  // const { email, from, to, reason, place } = req.body;
  const student = await User.findById(studentId);
  // const student = await User.findById(email);
  const { classInchargeId, wardenId } = student;
  // const { _id,classInchargeId, wardenId } = student;
  try {
    const fromDate = new Date(from);
    const dayOfWeek = fromDate.getDay();
    const status = dayOfWeek % 6 ? "REQUESTED2" : "REQUESTED1";
    const outpass = new Outpass({
      studentId,
      // _id,
      from,
      to,
      reason,
      place,
      status,
      classInchargeId,
      wardenId,
    });

    // console.log("Outpass:", outpass);

    const createdOutpass = await outpass.save();
    await User.findById(studentId)

      .then(async (student) => {
        student.outpassList.push(createdOutpass._id);
        await student.save();
        res.json(createdOutpass);
        // res.json({status:"SUCCESS",message:"Error while finding student to insert into outpasslist"})
        console.log("inserted into outpass");
      })
      .catch((err) => {
        console.log(err);
        res.json({
          message: "Error while finding student to insert into outpasslist",
        });
      });
    // console.log(createdOutpass.studentId.name);
    // console.dir(createdOutpass);
  } catch (err) {
    console.log(err);
    res.json("Error encountered while saving outpass");
  }
});

const approveOutpass = asyncHandler(async (req, res) => {
  // Approve an outpass by faculty or hostel warden
  const outpass = await Outpass.findById(req.params.id);
  if (outpass) {
    if (outpass.status === "REQUESTED2") {
      outpass.status = "REQUESTED1";
    } else if (outpass.status === "REQUESTED1") {
      outpass.status = "APPROVED";
      const uniqueCode = uuid.v4();
      await Outpass.findByIdAndUpdate(
        req.params.id,
        { qrCode: uniqueCode },
        { new: true }
      );
    } else {
      res.status(400).send("Outpass is not in REQUESTED state");
    }
  } else {
    res.status(404).send("Outpass not found");
  }
  await outpass.save();
  res.json(outpass);
});

const rejectOutpass = asyncHandler(async (req, res) => {
  // Reject an outpass by faculty or hostel warden
  const outpass = await Outpass.findById(req.params.id);
  if (outpass) {
    outpass.status = "REJECTED";
    await outpass.save();
    res.json(outpass);
  } else {
    res.status(404).send("Outpass not found");
  }
});


module.exports = {
  pendingOutpass,
  pendingOutpassStudent,
  pendingOutpassFaculty,
  pendingOutpassWarden,
  insertOutpass,
  approveOutpass,
  rejectOutpass,
};
