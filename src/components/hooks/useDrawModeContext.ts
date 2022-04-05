import { useContext } from "react";
import {
  getUpdatedTileGridObject,
  setLocalStorageItem,
} from "../../utils/helpers";
import { DrawModeContext } from "../context/drawModeContext";
import { Color, LocalStorageKeys } from "../../utils/types";
import { GlobalContext } from "../context/globalContext";

export const useDrawModeContext = () => {
  const { selectoRef } = useContext(GlobalContext);
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
    // TODO: There's still a selecto bug lMAOOOO
    selectoRef?.current?.setSelectedTargets([]);
    console.log(selectoRef?.current?.context);
  };

  const clearDrawModeContext = () => {
    setTileGridObject([]);
  };

  return { updateTileGridObject, clearDrawModeContext };
};
