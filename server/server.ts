// Importing the required modules
import WebSocketServer = require("ws");
import { WSMessageObject, WSMessageType } from "./utils/types";
const {
  parseESP32TileGrid,
  parseTileGridShape,
  constructWSObject,
} = require("./utils/helpers.ts");

const PORT = 3001;

// Creating a new websocket server
var wss = new WebSocketServer.Server({ port: PORT });
var CLIENTS: WebSocketServer.WebSocket[] = [];
var tileShapeStr1 = "m02013000002";
var tileShapeStr2 = "m02010302000";
var shapeFlag = true;

// Creating connection using websocket
// ws repreesnts one single client
wss.on("connection", (ws) => {
  CLIENTS.push(ws);
  broadcast(WSMessageType.new_client, "NEW USER JOINED", ws);

  // EMITS EVERY SECOND TO ALL CLIENTS
  // setInterval(() => {
  //   console.log("Sending?");
  //   ws.send("tileGridShape");
  // }, 1000);

  // sending message
  ws.on("message", (data) => {
    let tileShapeStr = shapeFlag ? tileShapeStr1 : tileShapeStr2;
    console.log("SHAPE: ", tileShapeStr);
    var messageStr = data.toString();
    console.log("Received this: ", messageStr);

    if (isJson(messageStr)) {
      console.log("FROM UI");
      var messageObj: WSMessageObject = JSON.parse(messageStr);
      switch (messageObj.type) {
        case WSMessageType.led_pattern:
          console.log("[UI] LED PATTERN EMITTED");
          broadcast(WSMessageType.led_pattern, messageObj.data.toString(), ws);
          break;
        case WSMessageType.request_sync_grid:
          console.log("[UI] REQUEST SYNC TILE GRID");
          // ws.send(JSON.stringify(parseTileGridShape(tileShapeStr)));
          var messageObjJSONStr: string = constructWSObject(
            WSMessageType.request_sync_grid,
            parseTileGridShape(tileShapeStr)
          );
          ws.send(messageObjJSONStr);
          shapeFlag = !shapeFlag;
          break;

        case WSMessageType.send_sync_grid:
          console.log("[ESP32] SEND SYNC TILE GRID");
          // var encodedStr: string = messageObj.data.toString();
          broadcast(WSMessageType.send_sync_grid, tileShapeStr, ws);
          broadcast(
            WSMessageType.send_sync_grid,
            parseTileGridShape(tileShapeStr),
            ws
          );

          break;

        case WSMessageType.pressure_data:
          console.log("[ESP32] PRESSURE DATA EMITTED");
          broadcast(WSMessageType.pressure_data, data.toString(), ws);
          console.log(WSMessageType.pressure_data);
          break;

        default:
          break;
      }
    } else {
      console.log("FROM ESP32");
      console.log(messageStr);
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

function sendAll(message: string) {
  for (var i = 0; i < CLIENTS.length; i++) {
    CLIENTS[i].send("> SERVER: " + message);
    sendWSObject(WSMessageType.alert, "> SERVER: " + message, CLIENTS[i]);
  }
}

function broadcast(
  type: WSMessageType,
  data: string,
  senderWS: WebSocketServer.WebSocket
) {
  wss.clients.forEach(function (client) {
    if (client !== senderWS) sendWSObject(type, data, client);
  });
  console.log("Broadcast: ", data.toString());
}

function sendWSObject(
  type: WSMessageType,
  data: string,
  ws: WebSocketServer.WebSocket
): void {
  ws.send(constructWSObject(type, data));
}

function isJson(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export {};
