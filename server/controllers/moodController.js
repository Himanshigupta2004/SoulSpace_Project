// const Mood = require("../models/moodModel");

// module.exports.trackMood = async (req, res) => {
//   try {
//     const { mood, rating } = req.body; 
//     const userId = req.params.userId; 

    
//     if (!mood || !rating) {
//       return res.status(400).json({ msg: "Mood and rating are required" });
//     }

//     if (!["Happy", "Sad", "Anxious", "Cry", "Neutral"].includes(mood)) {
//       return res.status(400).json({ msg: "Invalid mood" });
//     }

//     if (rating < 1 || rating > 5) {
//       return res.status(400).json({ msg: "Rating must be between 1 and 5" });
//     }

//     const newMood = new Mood({
//       userId,
//       mood,
//       rating,
//     });

//     await newMood.save();

//     return res.status(200).json({
//       msg: "Mood tracked successfully",
//       mood: newMood,
//     });
//   } catch (error) {
//     console.error("Error tracking mood:", error);
//     return res.status(500).json({ msg: "Error tracking mood" });
//   }
// };




// module.exports.getMoodHistory = async (req, res, next) => {
//   try {
//     const userId = req.params.id; 

    
//     const moods = await Mood.find({ user: userId }).sort({ timestamp: -1 });

//     if (moods.length === 0) {
//       return res.status(404).json({ message: "No mood history found" });
//     }

//     return res.status(200).json(moods);
//   } catch (ex) {
//     next(ex);
//   }
// };







// controllers/moodController.js
const Mood = require("../models/moodModel");

module.exports.addMood = async (req, res) => {
  try {
    const { username } = req.params;
    const { mood, scale } = req.body;

    // Basic validation
    if (!["happy", "angry", "sad", "tired"].includes(mood)) {
      return res.status(400).json({ message: "Invalid mood type" });
    }

    if (scale < 1 || scale > 10) {
      return res.status(400).json({ message: "Scale must be between 1 and 10" });
    }

    // Generate suggestion based on mood and scale
    const suggestion = generateSuggestion(mood, scale);

    // Create a new mood entry
    const newMood = new Mood({
      username,
      mood,
      scale,
      suggestions: suggestion,
    });

    await newMood.save();

    return res.status(200).json({ message: "Mood added successfully", data: newMood });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while adding mood" });
  }
};

// Function to generate suggestion based on mood and scale
function generateSuggestion(mood, scale) {
  if (mood === "happy") {
    if (scale <= 3) return "Maybe you're just starting to feel happy, keep it up!";
    if (scale <= 7) return "You're in a good mood! Spread the positivity!";
    return "You're super happy! Enjoy every moment!";
  }
  if (mood === "angry") {
    if (scale <= 3) return "Take a few deep breaths, you'll feel better soon.";
    if (scale <= 7) return "It might be a good time to go for a walk and calm down.";
    return "Take a break and relax; maybe do something to cool off.";
  }
  if (mood === "sad") {
    if (scale <= 3) return "It might be a tough moment; talk to someone you trust.";
    if (scale <= 7) return "Try doing something that helps lift your spirits.";
    return "Take it easy today, allow yourself to feel and process your emotions.";
  }
  if (mood === "tired") {
    if (scale <= 3) return "You might just need a small break.";
    if (scale <= 7) return "Consider taking a short nap or getting some rest.";
    return "Your body is telling you to recharge; take some time to relax!";
  }
  return "Stay positive!";
}
