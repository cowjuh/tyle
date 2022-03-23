import { LocalStorageKeys, TileGridObject } from "../components/types/types";
import axios from "axios";
import { getLocalStorageItem, ledConfigToString } from "./helpers";

export const emitTileGridObject = () => {
  const tileGridObject: TileGridObject = getLocalStorageItem(
    LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ
  );
  const req = {
    ledConfig: ledConfigToString(tileGridObject[0][0].ledConfig),
  };
  axios.post("http://localhost:5001/api/drawmode/", req).then((res) => {
    console.log(res.data);
  });
};
