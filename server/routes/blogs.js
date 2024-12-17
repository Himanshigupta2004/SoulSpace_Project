const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); 
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogsByUser,
} = require("../controllers/blogController");


router.post("/create", upload.single("image"), createBlog); 


router.get("/blog", getBlogs);


router.get("/blog/:id", getBlogById); 


router.put("/:id", updateBlog);


router.delete("/:id", deleteBlog);

// Get all blogs of specific user
// router.get("/user/:id", getBlogsByUser);

module.exports = router;



















// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload");
// const authenticateToken = require("../middlewares/auth"); // Import the auth middleware
// const {
//   createBlog,
//   getBlogs,
//   getBlogById,
//   updateBlog,
//   deleteBlog,
// } = require("../controllers/blogController");

// // Protect blog creation route (only authenticated users can create a blog)
// router.post("/create", authenticateToken, upload.single("image"), createBlog);

// // Other blog routes
// router.get("/blog", getBlogs);
// router.get("/blog/:id", getBlogById);
// router.put("/:id", authenticateToken, updateBlog); // Protect the update route
// router.delete("/:id", authenticateToken, deleteBlog); // Protect the delete route

// module.exports = router;
