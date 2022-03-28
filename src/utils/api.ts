import { LocalStorageKeys, TileGridObject } from "../components/types/types";
import axios from "axios";
import { getLocalStorageItem, ledConfigToString } from "./helpers";

const BASE_URL = "http://localhost:5001/api/";
const DRAW_MODE = "drawmode";
const DATA_MODE = "datamode";
const PROGRAMMODE = "programmode";
const TILE = "tile";

// TODO: choose Local Storage key to select the right object
// Currently configured for draw mode only
export const emitTileGridObject = () => {
  const tileGridObject: TileGridObject = getLocalStorageItem(
    LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ
  );
  const req = {
    ledConfig: ledConfigToString(tileGridObject[0][0].ledConfig),
  };
  axios.post(BASE_URL + DRAW_MODE, req).then((res) => {
    console.log(res.data);
  });
};

/**
 * GETS CURRENT TILE CONFIG (Should come from ESP32)
 */
export const getTileGridShape = () => {
  axios.get(BASE_URL + TILE).then((res) => {
    console.log(res.data);
    return res.data;
  });
};
