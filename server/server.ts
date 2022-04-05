// Importing the required modules
import WebSocketServer = require("ws");
import { WSMessageObject, WSMessageType } from "./utils/types";
const {
  parseESP32PressureData,
  parseTileGridShape,
  constructWSObject,
} = require("./utils/helpers.ts");

const PORT = 3001;

// Terminal Font Colors
const CYAN = "\x1b[36m%s\x1b[0m";
const GREEN = "\x1b[35m";
const YELLOW = "\x1b[33m";

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
  // FOR TESTING ONLY, THIS BEHAVIOUR SHOULD BE DONE BY THE ESP32 ITSELF
  setInterval(() => {
    sendWSObject(
      WSMessageType.pressure_data,
      parseESP32PressureData(
        `50 50 50 ${Math.floor(Math.random() * 200)} 50 50 50 50 50 50 50 50`
      ),
      ws
    );
  }, 1000);

  // ON RECEPTION OF MESSAGES
  ws.on("message", (data) => {
    let tileShapeStr = shapeFlag ? tileShapeStr1 : tileShapeStr2;
    var messageStr = data.toString();
    console.log(
      "\n\n-------------------------------------------------------------------"
    );
    console.log(YELLOW, "[SERVER] Received: ", messageStr);

    /**
     * JSON MESSAGES: From FRONTEND/WEB
     */
    if (isJson(messageStr)) {
      var messageObj: WSMessageObject = JSON.parse(messageStr);
      switch (messageObj.type) {
        // EMISSION OF LED PATTERN
        case WSMessageType.led_pattern:
          console.log(CYAN, "[UI] LED PATTERN EMITTED");
          broadcast(
            WSMessageType.led_pattern,
            messageObj.data.toString(),
            ws,
            true
          );
          break;

        /**
         * UI Making a request to sync the tile grid
         * The UI will send a single character, 'C' to the ESP32
         */
        case WSMessageType.request_sync_grid:
          console.log(CYAN, "[UI] REQUEST SYNC TILE GRID");
          broadcast(WSMessageType.request_sync_grid, "C", ws, true);

          // DELETE BELOW WHEN FULLY IMPLEMENTED
          var messageObjJSONStr: string = constructWSObject(
            WSMessageType.request_sync_grid,
            parseTileGridShape(tileShapeStr)
          );
          ws.send(messageObjJSONStr);
          shapeFlag = !shapeFlag;
          break;

        default:
          break;
      }

      /**
       * NON-JSON/RAW TEXT MESSAGES: FROM ESP32
       */
    } else {
      if (messageStr.charAt(0) === "m") {
        console.log(GREEN, "[ESP32] SENT SYNC TILE GRID");
        var messageObjJSONStr: string = constructWSObject(
          WSMessageType.request_sync_grid,
          parseTileGridShape(messageStr)
        );
      } else {
        console.log(GREEN, "[ESP32] PRESSURE DATA EMITTED");
        sendWSObject(
          WSMessageType.pressure_data,
          parseESP32PressureData(messageStr),
          ws
        );
      }
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
  senderWS: WebSocketServer.WebSocket,
  rawText?: boolean
) {
  wss.clients.forEach(function (client) {
    if (client !== senderWS) {
      if (!rawText) sendWSObject(type, data, client);
      else client.send(data);
    }
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
