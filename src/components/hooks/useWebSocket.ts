import { useContext } from "react";
import { IMessageEvent } from "websocket";
import {
  constructTileGridObj,
  encodeTileGrid,
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/helpers";
import { DrawModeContext } from "../context/drawModeContext";
import { GlobalContext } from "../context/globalContext";
import { PressureDataContext } from "../context/pressureDataContext";
import { ProgramModeContext } from "../context/programModeContext";
import { WebSocketContext } from "../context/webSocketContext";
import {
  LocalStorageKeys,
  TileGridObject,
  TileGridPressure,
  TilePressure,
  WSMessageObject,
  WSMessageType,
} from "../types/types";

export const useWebSocket = () => {
  const socket = useContext(WebSocketContext);
  const { setProgramModeStates } = useContext(ProgramModeContext);
  const { setDrawModeTileGridObject, drawModeTileGridObject } =
    useContext(DrawModeContext);
  const { setGlobalTileGridObject } = useContext(GlobalContext);
  const { setPressureDataObject } = useContext(PressureDataContext);

  const onMessage = () => {
    if (socket.readyState === WebSocket.CLOSED) {
      console.log("CLOSED");
      return;
    }
    socket.onmessage = (event) => {
      console.log("ON MESSAGE DATA: ", event.data);
      var messageStr = JSON.stringify(event.data);
      var messageObj: WSMessageObject = JSON.parse(JSON.parse(messageStr));
      switch (messageObj.type) {
        case WSMessageType.led_pattern:
          console.log("[UI] LED PATTERN EMITTED");
          break;
        case WSMessageType.request_sync_grid:
          console.log("[UI] REQUEST SYNC TILE GRID");
          var tileShape: number[][] = messageObj.data;
          var tileGridObj: TileGridObject = constructTileGridObj(tileShape);
          console.log("SETTING THIS OBJ: ", tileGridObj);
          setProgramModeStates([]);
          setGlobalTileGridObject(tileGridObj);
          setDrawModeTileGridObject(tileGridObj);
          setLocalStorageItem(
            LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ,
            tileGridObj
          );
          setLocalStorageItem(
            LocalStorageKeys.LAST_EMTITED_TILE_GRID,
            tileGridObj
          );
          setLocalStorageItem(
            LocalStorageKeys.GLOBAL_TILE_GRID_LS_OBJ,
            tileGridObj
          );
          break;

        case WSMessageType.send_sync_grid:
          console.log("[ESP32] SEND SYNC TILE GRID");
          // var encodedStr: string = messageObj.data.toString();

          break;

        case WSMessageType.pressure_data:
          console.log("[ESP32] PRESSURE DATA EMITTED");
          let pressureObj: TileGridPressure = messageObj.data;
          setPressureDataObject(pressureObj);
          break;

        default:
          break;
      }
    };
  };

  const constructWSObject = (type: WSMessageType, data: string): string => {
    const obj: WSMessageObject = { type: type, data: data };
    return JSON.stringify(obj);
  };

  const syncTileGrid = () => {
    if (socket.readyState === WebSocket.CLOSED) {
      throw new Error("CLOSED");
    }
    const messageStr = constructWSObject(WSMessageType.request_sync_grid, "");
    setGlobalTileGridObject([]);
    removeLocalStorageItem(LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ);
    removeLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ);
    removeLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_TILE_GRID_LS_OBJ);
    try {
      socket.send(messageStr);
    } catch (error) {
      console.log("couldnt send message");
    }
    onMessage();
  };

  const emitLEDPattern = (newTileGrid: TileGridObject) => {
    const ogTileGrid: TileGridObject = getLocalStorageItem(
      LocalStorageKeys.LAST_EMTITED_TILE_GRID
    );
    const encodedStr = encodeTileGrid(ogTileGrid, newTileGrid);
    if (encodedStr === "") {
      console.log("No changes to emit");
      return;
    }

    var messageStr = constructWSObject(
      WSMessageType.led_pattern,
      encodeTileGrid(ogTileGrid, newTileGrid)
    );
    console.log("sending this: ", messageStr);
    socket.send(messageStr);
    setLocalStorageItem(LocalStorageKeys.LAST_EMTITED_TILE_GRID, newTileGrid);
  };

  return { socket, onMessage, constructWSObject, syncTileGrid, emitLEDPattern };
};
