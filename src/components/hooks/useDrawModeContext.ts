import { useContext } from "react";
import {
  getUpdatedTileGridObject,
  setDrawModeTileGridObject,
} from "../../utils/helpers";
import { DrawModeContext } from "../context/drawModeContext";
import { Color } from "../types/types";

export const useDrawModeContext = () => {
  const { tileGridObject, setTileGridObject } = useContext(DrawModeContext);
  const updateTileGridObject = (color: Color) => {
    let udpdatedTileGridObject = getUpdatedTileGridObject(
      color,
      tileGridObject
    );
    setTileGridObject(udpdatedTileGridObject);
    setDrawModeTileGridObject(udpdatedTileGridObject);
    Array.from(document.querySelectorAll(".led")).forEach((el) =>
      el.classList.remove("selected")
    );
  };

  return [updateTileGridObject];
};
