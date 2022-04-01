import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";
import {
  LocalStorageKeys,
  TileGridObject,
  WSMessageObject,
  WSMessageType,
} from "../components/types/types";
import { encodeTileGrid, removeLocalStorageItem } from "./helpers";

const HOST = "192.168.0.41";
const IPHONE_HOTSPOT = "172.20.10.2";
const UBC_SECURE = "128.189.131.17";
const SONG_LING = "192.168.50.71";
const PORT = 3001;

export const wsClient = new W3CWebSocket(`ws://${HOST}:${PORT}`);

const constructWSObject = (type: WSMessageType, data: string): string => {
  const obj: WSMessageObject = { type: type, data: data };
  return JSON.stringify(obj);
};

export const syncTileGrid = () => {
  const messageStr = constructWSObject(WSMessageType.request_sync_grid, "");
  wsClient.send(messageStr);
  removeLocalStorageItem(LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ);
  removeLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ);
  removeLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_TILE_GRID_LS_OBJ);
};

export const emitLEDPattern = (
  ogTileGrid: TileGridObject,
  newTileGrid: TileGridObject
) => {
  var messageStr = constructWSObject(
    WSMessageType.led_pattern,
    encodeTileGrid(ogTileGrid, newTileGrid)
  );
  console.log("sending this: ", messageStr);
  wsClient.send(messageStr);
};

export const onMessage = (event: IMessageEvent) => {
  console.log("DATA: ", event.data);
  var messageStr = JSON.stringify(event.data);
  var messageObj: WSMessageObject = JSON.parse(JSON.parse(messageStr));
  console.log("FUlly parsed: ", messageObj);
  switch (messageObj.type) {
    case WSMessageType.led_pattern:
      console.log("[UI] LED PATTERN EMITTED");
      break;
    case WSMessageType.request_sync_grid:
      console.log("[UI] REQUEST SYNC TILE GRID");
      var tileShape: number[][] = messageObj.data;
      console.log("My shape: ", tileShape);
      // setLocalStorageItem(
      //   LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ,
      //   messageObj.data
      // );
      break;

    case WSMessageType.send_sync_grid:
      console.log("[ESP32] SEND SYNC TILE GRID");
      // var encodedStr: string = messageObj.data.toString();

      break;

    case WSMessageType.pressure_data:
      console.log("[ESP32] PRESSURE DATA EMITTED");
      console.log(WSMessageType.pressure_data);
      break;

    default:
      break;
  }
};
