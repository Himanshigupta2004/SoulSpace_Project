const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;  
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    const domain = email.split('@')[1];
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    if(domain !== "gmail.com")
    {
      return res.json({ msg: "Email is not valid", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};


const mongoose = require("mongoose");
// const User = require("../models/userModel"); // Assuming the User model is in models/User.js

// module.exports.updateProfile = async (req, res) => {
//   console.log("req");
//   try {
//     const username = req.params.username; // This is the username from the URL
//     console.log(username);
//     const newUsername = req.body.username;
//     console.log(newUsername)
//     const updates = req.body; // This is the update data from the request body

//     // Validate input data (e.g., email format, username constraints)
//     if (updates.email && !isValidEmail(updates.email)) {
//       return res.status(400).json({ message: "Invalid email format" });
//     }

//     if (updates.username && updates.username.length < 3) {
//       return res.status(400).json({ message: "Username must be at least 3 characters long" });
//     }

//     // Update user data based on the username
//     const user = await User.findOneAndUpdate(
//       { username }, 
//       newUsername,
//       { new: true, runValidators: true }
//     );

   

//     console.log(updatedUser);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
    
//     // Return updated user profile
//     return res.status(200).json({message:"updated successfully",data: user});
//   } catch (ex) {
//     return res.status(500).json({message: "error"});
//   }
// };

module.exports.updateProfile = async (req, res) => {
  try {
    const username = req.params.username; // Get the username from the URL
    const updates = req.body; // Data for updating the profile

    if (updates.email && !isValidEmail(updates.email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (updates.username && updates.username.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }

    // Perform the update
    const updatedUser = await User.findOneAndUpdate(
      { username }, // Find the user by username
      { $set: updates }, // Update the user's fields
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Profile updated successfully", data: updatedUser });
  } catch (ex) {
    return res.status(500).json({ message: "An error occurred" });
  }
};


// Helper function to validate email (basic example)
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}







