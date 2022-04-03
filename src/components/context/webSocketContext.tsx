import { createContext, ReactChild } from "react";
import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

const HOST = "192.168.0.41";
const IPHONE_HOTSPOT = "192.168.43.230";
const UBC_SECURE = "128.189.132.24";
const SONG_LING = "192.168.50.71";

const PORT = 3001;

export const wsClient = new W3CWebSocket(`ws://${SONG_LING}:${PORT}`);

export const WebSocketContext = createContext(wsClient);

interface ISocketProvider {
  children: ReactChild;
}

export const WebSocketProvider = (props: ISocketProvider) => (
  <WebSocketContext.Provider value={wsClient}>
    {props.children}
  </WebSocketContext.Provider>
);
