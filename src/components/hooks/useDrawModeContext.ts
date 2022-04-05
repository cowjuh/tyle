import { useContext } from "react";
import {
  getUpdatedTileGridObject,
  setLocalStorageItem,
} from "../../utils/helpers";
import { DrawModeContext } from "../context/drawModeContext";
import { Color, LocalStorageKeys } from "../../utils/types";
import { GlobalContext } from "../context/globalContext";
import Selecto from "react-selecto";

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
    selectoRef?.current?.setSelectedTargets([]);
    console.log(selectoRef?.current);
  };

  const clearDrawModeContext = () => {
    setTileGridObject([]);
  };

  return { updateTileGridObject, clearDrawModeContext };
};
