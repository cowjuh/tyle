import { w3cwebsocket as W3CWebSocket } from "websocket";
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

export const wsClient = new W3CWebSocket(`ws://${SONG_LING}:${PORT}`);

const constructWSObject = (type: WSMessageType, data: string): string => {
  const obj: WSMessageObject = { type: type, data: data };
  return JSON.stringify(obj);
};

export const syncTileGrid = () => {
  const messageObj: WSMessageObject = {
    type: WSMessageType.request_sync_grid,
    data: "",
  };
  wsClient.send(JSON.stringify(messageObj));
  removeLocalStorageItem(LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ);
  removeLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ);
  removeLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_TILE_GRID_LS_OBJ);
};

export const emitLEDPattern = (
  ogTileGrid: TileGridObject,
  newTileGrid: TileGridObject
) => {
  var obj = constructWSObject(
    WSMessageType.led_pattern,
    encodeTileGrid(ogTileGrid, newTileGrid)
  );
  console.log("sending this: ", obj);
  wsClient.send(
    constructWSObject(
      WSMessageType.led_pattern,
      encodeTileGrid(ogTileGrid, newTileGrid)
    )
  );
};
