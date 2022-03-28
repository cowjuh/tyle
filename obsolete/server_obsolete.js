// const express = require("express");
// const cors = require("cors");
// const app = express();
// const bodyParser = require("body-parser");
// const http = require("http");
// const { Server } = require("socket.io");
// const { arduinoPort } = require("./arduinoSerial");

// // ROUTE IMPORTS
// const programModeRouter = require("./routes/programMode");
// const dataModeRouter = require("./routes/dataMode");
// const drawModeRouter = require("./routes/drawMode");
// const tileRouter = require("./routes/tilegrid");

// // CONSTANT VARIABLES
// const SERVER_PORT = 3001;

// // WEBSOCKET
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// // API ROUTES
// app.use("/api/programmode", programModeRouter);
// app.use("/api/datamode", dataModeRouter);
// app.use("/api/drawmode", drawModeRouter);
// app.use("/api/tile", tileRouter);

// // ARDUINO PORT AND PARSER SETUP

// arduinoPort.on("error", function (err) {
//   console.log("Error: ", err.message);
// });

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.io}`);

//   socket.on("send_message", (data) => {
//     console.log("received?");
//     socket.broadcast.emit("receive_message", data);
//     socket.emit("message", {
//       value: "WOOOhoo",
//     });
//   });

//   socket.on("receive_message", (data) => {
//     console.log("received?");
//     socket.broadcast.emit("receive_message", "hey");
//   });
// });

// app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));

// async function init() {
//   await sleep(1500);
// }

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// init();

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());

const SERVER_PORT = 3001;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log("send_message:", data);
    socket.broadcast.emit("receive_message", data);
    socket.emit("receive_message", data);
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
