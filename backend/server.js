const app = require("./app");
const connectDatabase = require("./config/database");
const PORT = process.env.PORT || 4000;

connectDatabase();

const server = app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

// ============= socket.io ==============

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join session", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  // for like
  socket.on("liked", (data) => {
    const like = data.notifData.receiverUser._id;

    if (!like) return console.log("like not defined");

    socket.in(like).emit("like recieved", data.notifData);
  });

  // for super like ->
  socket.on("super liked", (data) => {
    const superLike = data.notifData.receiverUser._id;

    if (!superLike) return console.log("superLike not defined");

    socket.in(superLike).emit("super like recieved", data.notifData);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  process.exit(1);
});

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Stack: ${err.stack}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});