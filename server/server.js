// Importing the required modules
const WebSocketServer = require("ws");

// Creating a new websocket server
var wss = new WebSocketServer.Server({ port: 3001 }),
  CLIENTS = [];

// Creating connection using websocket
wss.on("connection", (ws) => {
  CLIENTS.push(ws);
  ws.on("message", function (message) {
    sendAll(message);
  });
  ws.send("NEW USER JOINED");
  // sending message
  ws.on("message", (data) => {
    console.log("Received Local Storage Data");
  });
  // handling what to do when clients disconnects from server
  ws.on("close", () => {
    console.log("CLIENT DISCONNECTED");
  });
  // handling client connection error
  ws.onerror = function () {
    console.log("Some Error occurred");
  };
});
console.log("The WebSocket server is running on port 3001");

function sendAll(message) {
  for (var i = 0; i < CLIENTS.length; i++) {
    CLIENTS[i].send("Message: " + message);
  }
}
