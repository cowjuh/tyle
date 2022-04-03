import { createContext } from "react";
import { TileGridObject } from "../types/types";

interface DrawModeContextProps {
  drawModeTileGridObject: TileGridObject;
  setDrawModeTileGridObject: (tileGridObject: TileGridObject) => void;
}

export const DrawModeContext = createContext<DrawModeContextProps>({
  drawModeTileGridObject: [],
  setDrawModeTileGridObject: () => {},
});
