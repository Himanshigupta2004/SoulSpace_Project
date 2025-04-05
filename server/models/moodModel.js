// const mongoose = require("mongoose");

// const moodSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Users", 
//     required: true,
//   },
//   mood: {
//     type: String,
//     enum: ["Happy", "Sad", "Anxious", "Cry", "Neutral"],
//     required: true,
//   },
//   rating: {
//     type: Number,
//     min: 1,
//     max: 5,
//     required: true, 
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Mood", moodSchema);




// // models/moodModel.js
// const mongoose = require("mongoose");

// const moodSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     mood: {
//       type: String,
//       enum: ["happy", "angry", "sad", "tired"],
//       required: true,
//     },
//     scale: {
//       type: Number,
//       min: 1,
//       max: 10,
//       required: true,
//     },
//     suggestions: {
//       type: String,
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Mood", moodSchema);




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
