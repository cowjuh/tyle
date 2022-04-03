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
import { ProgramModeContext } from "../context/programModeContext";
import { WebSocketContext } from "../context/webSocketContext";
import {
  LocalStorageKeys,
  TileGridObject,
  WSMessageObject,
  WSMessageType,
} from "../types/types";

export const useWebSocket = () => {
  const socket = useContext(WebSocketContext);
  const { setDrawModeTileGridObject: setTileGridObject } =
    useContext(DrawModeContext);
  const { setProgramModeStates } = useContext(ProgramModeContext);
  const { setGlobalTileGridObject } = useContext(GlobalContext);

  const onMessage = (event: IMessageEvent) => {
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
        setLocalStorageItem(
          LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ,
          tileGridObj
        );
        setLocalStorageItem(
          LocalStorageKeys.LAST_EMTITED_TILE_GRID,
          tileGridObj
        );
        setGlobalTileGridObject(tileGridObj);
        setProgramModeStates([]);
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

  const constructWSObject = (type: WSMessageType, data: string): string => {
    const obj: WSMessageObject = { type: type, data: data };
    return JSON.stringify(obj);
  };

  const syncTileGrid = () => {
    const messageStr = constructWSObject(WSMessageType.request_sync_grid, "");
    socket.send(messageStr);
    removeLocalStorageItem(LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ);
    removeLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ);
    removeLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_TILE_GRID_LS_OBJ);
  };

  const emitLEDPattern = (newTileGrid: TileGridObject) => {
    const ogTileGrid: TileGridObject = getLocalStorageItem(
      LocalStorageKeys.LAST_EMTITED_TILE_GRID
    );
    var messageStr = constructWSObject(
      WSMessageType.led_pattern,
      encodeTileGrid(ogTileGrid, newTileGrid)
    );
    console.log("sending this: ", messageStr);
    socket.send(messageStr);
  };

  return { socket, onMessage, constructWSObject, syncTileGrid, emitLEDPattern };
};
