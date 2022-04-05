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

// CONSOLE.LOG Divider
const DIVIDER = "\n\n--------------------------------------------------------";

// Creating a new websocket server
var wss = new WebSocketServer.Server({ port: PORT });
var CLIENTS: WebSocketServer.WebSocket[] = [];

// ! FOR EMULATION ONLY
var tileShapeStr1 = "m02013000002";
var tileShapeStr2 = "m02010302000";
var shapeFlag = true;

// Creating connection using websocket
// ws repreesnts one single client
wss.on("connection", (ws) => {
  CLIENTS.push(ws);
  broadcast(WSMessageType.new_client, "NEW USER JOINED", ws);

  ws.on("message", (data) => {
    var messageStr = data.toString();
    console.log(DIVIDER);
    console.log(YELLOW, "[SERVER] Received: ", messageStr);

    isJson(messageStr)
      ? handleJSONMessage(ws, messageStr)
      : handleRawTextMessage(ws, messageStr);
  });

  ws.on("close", () => {
    console.log("CLIENT DISCONNECTED");
  });

  ws.onerror = function () {
    console.log("Some Error occurred");
  };

  // EMITS EVERY SECOND TO ALL CLIENTS
  // ! FOR TESTING ONLY, THIS BEHAVIOUR SHOULD BE DONE BY THE ESP32 ITSELF
  setInterval(() => {
    sendWSObject(
      WSMessageType.pressure_data,
      parseESP32PressureData(
        `50 50 50 ${Math.floor(Math.random() * 200)} 50 50 50 50 50 50 50 50`
      ),
      ws
    );
  }, 1000);
});

console.log(`The WebSocket server is running on port ${PORT}`);

/**
 * Handles JSON formatted messages to the WS Server
 * This is assumed to be from web clients
 * @param ws
 * @param message
 */
function handleJSONMessage(ws: WebSocketServer.WebSocket, message: string) {
  let tileShapeStr = shapeFlag ? tileShapeStr1 : tileShapeStr2;
  var messageObj: WSMessageObject = JSON.parse(message);
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

    // UI Making a request to sync the tile grid
    // The UI will send a single character, 'C' to the ESP32
    case WSMessageType.request_sync_grid:
      console.log(CYAN, "[UI] REQUEST SYNC TILE GRID");
      broadcast(WSMessageType.request_sync_grid, "C", ws, true);

      // ! DELETE BELOW WHEN FULLY IMPLEMENTED
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
}

/**
 * Handles raw text messages to the WS server.
 * These are assumed to come from the ESP32.
 * @param ws
 * @param message
 */
function handleRawTextMessage(ws: WebSocketServer.WebSocket, message: string) {
  if (message.charAt(0) === "m") {
    console.log(GREEN, "[ESP32] SENT SYNC TILE GRID");
    var messageObjJSONStr: string = constructWSObject(
      WSMessageType.request_sync_grid,
      parseTileGridShape(message)
    );
  } else {
    console.log(GREEN, "[ESP32] PRESSURE DATA EMITTED");
    sendWSObject(
      WSMessageType.pressure_data,
      parseESP32PressureData(message),
      ws
    );
  }
}

/**
 * Sends a WSObject to all clients
 * @param message
 */
function sendAll(message: string) {
  for (var i = 0; i < CLIENTS.length; i++) {
    CLIENTS[i].send("> SERVER: " + message);
    sendWSObject(WSMessageType.alert, "> SERVER: " + message, CLIENTS[i]);
  }
}

/**
 * Emits to all websocket clients except senderWS
 * @param type
 * @param data
 * @param senderWS
 * @param rawText
 */
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

/**
 * Sends a JSON formatted WS Object to the specified WS client
 * @param type
 * @param data
 * @param ws
 */
function sendWSObject(
  type: WSMessageType,
  data: string,
  ws: WebSocketServer.WebSocket
): void {
  ws.send(constructWSObject(type, data));
}

/**
 * Checks whether or not a given string is JSON
 * @param str
 * @returns
 */
function isJson(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export {};
