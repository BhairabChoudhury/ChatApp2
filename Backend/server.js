const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
//const socket = require("socket.io") ; 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5176"],
    credentials: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

// SOCKET.IO
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5176"],
  },
});


io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    if (userData && userData._id) {
      socket.join(userData._id);
      console.log(userData._id);
      socket.emit("connected");
    }
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  })

 socket.on("typing", (room) => {
    socket.in(room).emit("typing", room);
  }) 
 socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing", room);
  }) 

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;//For every user in the chat except sender, emit the message to their personal room

      socket.in(user._id).emit("message received", newMessageRecieved);
    });
  });

});
/**
 User 1 sends message
        ↓
Server receives "new message"
        ↓
Loop users
        ↓
Send to User 2’s room only

 */