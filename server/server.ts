// Importing the required modules
import WebSocketServer = require("ws");
import { WSMessageObject, WSMessageType } from "./utils/types";
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
  broadcast("NEW USER JOINED", ws);

  // EMITS EVERY SECOND TO ALL CLIENTS
  // setInterval(() => {
  //   console.log("Sending?");
  //   ws.send("tileGridShape");
  // }, 1000);

  // sending message
  ws.on("message", (data) => {
    var messageStr = data.toString();
    var messageObj: WSMessageObject = JSON.parse(messageStr);
    switch (messageObj.type) {
      case WSMessageType.led_pattern:
        console.log("[UI] LED PATTERN EMITTED");
        broadcast(messageObj.data.toString(), ws);
        break;
      case WSMessageType.request_sync_grid:
        console.log("[UI] REQUEST SYNC TILE GRID");
        break;

      case WSMessageType.send_sync_grid:
        console.log("[ESP32] SEND SYNC TILE GRID");
        break;

      case WSMessageType.pressure_data:
        console.log("[ESP32] PRESSURE DATA EMITTED");
        broadcast(data.toString(), ws);
        console.log(WSMessageType.pressure_data);
        break;

      default:
        break;
    }
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

function broadcast(data: string, senderWS: WebSocketServer.WebSocket) {
  wss.clients.forEach(function (client) {
    if (client !== senderWS) client.send(data);
    else client.send("Received Data");
  });
  console.log("Broadcast: ", data.toString());
}

export {};
