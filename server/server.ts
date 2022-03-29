// Importing the required modules
import WebSocketServer = require("ws");
const {
  parseESP32TileGrid,
  parseTileGridShape,
} = require("./utils/helpers.ts");

// Creating a new websocket server
var wss = new WebSocketServer.Server({ port: 3001 });
var CLIENTS: any = [];

// Creating connection using websocket
wss.on("connection", (ws) => {
  CLIENTS.push(ws);
  ws.on("message", function (message: string) {
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

// parseTileGridShape("123"); //Invalid
// parseTileGridShape("1234"); //Invalid
// parseTileGridShape("m02013000002");
// parseTileGridShape("m03000031200");
// parseTileGridShape("m02010302000");

function sendAll(message: string) {
  for (var i = 0; i < CLIENTS.length; i++) {
    CLIENTS[i].send("Message: " + message);
  }
}

export {};
