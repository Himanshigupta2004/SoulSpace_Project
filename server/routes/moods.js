// const express = require("express");
// const router = express.Router();
// const { trackMood , getMoodHistory} = require("../controllers/moodController");

// router.post("/:userId/track", trackMood); 
// router.get("/:id/history", getMoodHistory);

// module.exports = router;



// routes/moodRoutes.js
const express = require("express");
const router = express.Router();
const { addMood, getMoodHistory } = require("../controllers/moodController");

// Route to add mood
router.post("/moodtrack/:username", addMood);

// Route to get mood history for a user
// router.get("/moodhistory/:username", getMoodHistory);

module.exports = router;
