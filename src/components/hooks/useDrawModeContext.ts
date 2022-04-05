import { useContext } from "react";
import {
  getUpdatedTileGridObject,
  setLocalStorageItem,
} from "../../utils/helpers";
import { DrawModeContext } from "../context/drawModeContext";
import { Color, LocalStorageKeys } from "../../utils/types";

export const useDrawModeContext = () => {
  const {
    drawModeTileGridObject: tileGridObject,
    setDrawModeTileGridObject: setTileGridObject,
  } = useContext(DrawModeContext);

  const updateTileGridObject = (color: Color) => {
    let updatedTileGridObject = getUpdatedTileGridObject(color, tileGridObject);
    setTileGridObject(updatedTileGridObject);
    setLocalStorageItem(
      LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ,
      updatedTileGridObject
    );
    Array.from(document.querySelectorAll(".led")).forEach((el) =>
      el.classList.remove("selected")
    );
  };

  const clearDrawModeContext = () => {
    setTileGridObject([]);
  };

  return { updateTileGridObject, clearDrawModeContext };
};
