import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  TileGridObject,
  WSMessageObject,
  WSMessageType,
} from "../components/types/types";

const HOST = "192.168.0.41";
const IPHONE_HOTSPOT = "172.20.10.2";
const UBC_SECURE = "128.189.131.17";
const PORT = 3001;

export const wsClient = new W3CWebSocket(`ws://${UBC_SECURE}:${PORT}`);

const constructWSObject = (
  type: WSMessageType,
  data: Object
): WSMessageObject => {
  return { type: type, data: data };
};

export const syncTileGrid = () => {
  const messageObj: WSMessageObject = {
    type: WSMessageType.sync_grid,
    data: {},
  };
  wsClient.send(JSON.stringify(messageObj));
};

export const emitLEDPattern = (tileGridObj: TileGridObject) => {
  wsClient.send(constructWSObject(WSMessageType.led_pattern, tileGridObj));
};
