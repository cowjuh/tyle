// Importing the required modules
import WebSocketServer = require("ws");
const {
  parseESP32TileGrid,
  parseTileGridShape,
} = require("./utils/helpers.ts");

const PORT = 3001;

// Creating a new websocket server
var wss = new WebSocketServer.Server({ port: PORT });
var CLIENTS: WebSocketServer.WebSocket[] = [];

// Creating connection using websocket
// ws repreesnts one single client
wss.on("connection", (ws) => {
  CLIENTS.push(ws);
  ws.on("message", function (message: string) {
    broadcast(message, ws);
  });
  broadcast("NEW USER JOINED", ws);

  // EMITS EVERY SECOND TO ALL CLIENTS
  // setInterval(() => {
  //   console.log("Sending?");
  //   ws.send("tileGridShape");
  // }, 1000);

  // sending message
  ws.on("message", (data) => {
    console.log("Received Local Storage Data");
    var parsedMsg = JSON.parse(data.toString());
    console.log(parsedMsg.type);
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
console.log(`The WebSocket server is running on port ${PORT}`);

parseESP32TileGrid("1 2 3 4 5 6 7 8");
// parseTileGridShape("123"); //Invalid
// parseTileGridShape("1234"); //Invalid
// parseTileGridShape("m02013000002");
// parseTileGridShape("m03000031200");
// parseTileGridShape("m02010302000");

function sendAll(message: string) {
  for (var i = 0; i < CLIENTS.length; i++) {
    CLIENTS[i].send("> SERVER: " + message);
  }
}

function broadcast(data: string, ws: WebSocketServer.WebSocket) {
  wss.clients.forEach(function (client) {
    if (client !== ws) client.send(data);
  });
  console.log("Broadcast: ", data.toString());
}

export {};
