import { useContext } from "react";
import {
  getUpdatedTileGridObject,
  setDrawModeTileGridObject,
} from "../../utils/helpers";
import { TileGridContext } from "../context/tileGridContext";
import { Color } from "../types/types";

export const useTileGridContext = () => {
  const { tileGridObject, setTileGridObject } = useContext(TileGridContext);
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
