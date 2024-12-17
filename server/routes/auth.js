const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  updateProfile,

} = require("../controllers/userController");
const router = require("express").Router();
router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);
// router.delete('/user/:username', async (req, res) => {
//   try {
//       const username = req.params.username; 
//       const result = await User.deleteOne({ username }); 
//       if (result.deletedCount === 0) {
//           return res.status(404).json({ message: "User not found" });
//       }
//       res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//       console.error("Error deleting user:", error);
//       res.status(500).json({ error: "An error occurred while deleting the user" }); 
//   }
// });


router.post('/user/:username', updateProfile);


module.exports = router;





