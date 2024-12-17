const Blog = require("../models/blogModel");
 


module.exports.createBlog = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    
    const image = req.file ? req.file.path : null;  
    
    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const newBlog = await Blog.create({
      title,
      content,
      author,
      image,  
    });

    return res.status(201).json({ message: "Blog created successfully", data: newBlog });
  } catch (ex) {
    next(ex); 
  }
};



module.exports.getBlogs = async (req, res, next) => {
    try {
      const blogs = await Blog.find()
        .populate("author", "username email avatarImage") 
        .sort({ createdAt: -1 }); 
      return res.status(200).json(blogs);
    } catch (ex) {
      next(ex);
    }
  };
  


module.exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "username email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    return res.status(200).json(blog);
  } catch (ex) {
    next(ex);
  }
};


module.exports.updateBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    const updatedBlog = await blog.save();
    return res.status(200).json({ message: "Blog updated successfully", data: updatedBlog });
  } catch (ex) {
    next(ex);
  }
};


module.exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (ex) {
    next(ex);
  }
};


// module.exports.getBlogsByUser = async (req, res, next) => {
//     try {
//       const { userId } = req.params;  // Get user ID from the request params
      
//       // Find all blogs where the author matches the userId
//       const blogs = await Blog.find({ author: userId })
//         .populate("author", "username email avatarImage") // Populate author details
//         .sort({ createdAt: -1 });  // Sort blogs by creation date, most recent first
  
//       if (blogs.length === 0) {
//         return res.status(404).json({ message: "No blogs found for this user" });
//       }
  
//       return res.status(200).json(blogs);
//     } catch (ex) {
//       next(ex);
//     }
//   };
  
