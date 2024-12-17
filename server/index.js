// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
// const blogRoutes = require("./routes/blogs"); 
// const app = express();
// const socket = require("socket.io");
// const moodRoutes = require("./routes/moods");
// app.use(express.json()); 


// require("dotenv").config();

// app.use(cors());
// app.use(express.json());


// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connetion Successfull");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// app.get("/ping", (_req, res) => {
//   return res.json({ msg: "Ping Successful" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/uploads", express.static("uploads"));
// app.use("/api/mood", moodRoutes);


// const server = app.listen(process.env.PORT, () =>
//   console.log(`Server started on ${process.env.PORT}`)
// );
// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });






// // const express = require("express");
// // const cors = require("cors");
// // const mongoose = require("mongoose");
// // const authRoutes = require("./routes/auth");
// // const messageRoutes = require("./routes/messages");
// // const blogRoutes = require("./routes/blogs");
// // const { authenticateToken } = require("./middleware/authMiddleware"); // Import JWT middleware
// // const app = express();
// // const socket = require("socket.io");

// // require("dotenv").config();

// // app.use(cors());
// // app.use(express.json());

// // // Database Connection
// // mongoose
// //   .connect(process.env.MONGO_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => {
// //     console.log("DB Connection Successful");
// //   })
// //   .catch((err) => {
// //     console.log(err.message);
// //   });

// // // Test Route
// // app.get("/ping", (_req, res) => {
// //   return res.json({ msg: "Ping Successful" });
// // });

// // // Routes
// // app.use("/api/auth", authRoutes);

// // // Protect these routes with the `authenticateToken` middleware
// // app.use("/api/messages", authenticateToken, messageRoutes);
// // app.use("/api/blogs", authenticateToken, blogRoutes);
// // // app.use("/api/moods", authenticateToken, moodRoutes); // Uncomment when moods are implemented

// // app.use("/uploads", express.static("uploads"));

// // // Start Server
// // const server = app.listen(process.env.PORT, () =>
// //   console.log(`Server started on port ${process.env.PORT}`)
// // );

// // // Socket.IO Integration
// // const io = socket(server, {
// //   cors: {
// //     origin: "http://localhost:3000",
// //     credentials: true,
// //   },
// // });

// // global.onlineUsers = new Map();

// // io.on("connection", (socket) => {
// //   global.chatSocket = socket;

// //   socket.on("add-user", (userId) => {
// //     onlineUsers.set(userId, socket.id);
// //   });

// //   socket.on("send-msg", (data) => {
// //     const sendUserSocket = onlineUsers.get(data.to);
// //     if (sendUserSocket) {
// //       socket.to(sendUserSocket).emit("msg-receive", data.msg);
// //     }
// //   });
// // });


// index.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios"); // Required for HTTP requests to Flask

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const blogRoutes = require("./routes/blogs");
const moodRoutes = require("./routes/moods");

const app = express();
const socket = require("socket.io");

// Load environment variables from .env file
require("dotenv").config();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Database connection setup (MongoDB)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log("DB Connection Error:", err.message);
  });

// Basic test route
app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

// Auth, Messages, and Blog Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/blogs", blogRoutes);

// Route to get mood suggestion from Flask AI model
app.post("/api/moods/get_suggestion", async (req, res) => {
  try {
    const { mood_type, mood_scale } = req.body;

    // Send request to Flask for mood suggestion
    const response = await axios.post("http://127.0.0.1:5000/get_suggestion", {
      mood_type: mood_type,
      mood_scale: mood_scale,
    });

    // Send Flask response back to client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching mood suggestion:", error);
    res.status(500).json({ error: "Error fetching mood suggestion" });
  }
});

// Static files (uploads)
app.use("/uploads", express.static("uploads"));

// Socket.IO Setup
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL if different
    credentials: true,
  },
});

// Socket.IO event listeners for chat functionality
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;

  // Add user to online users map
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  // Handle message sending
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
