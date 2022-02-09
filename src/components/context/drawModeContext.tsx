import { createContext } from "react";
import { TileGridObject } from "../types/types";

interface DrawModeContextProps {
  tileGridObject: TileGridObject;
  setTileGridObject: (tileGridObject: TileGridObject) => void;
}

export const DrawModeContext = createContext<DrawModeContextProps>({
  tileGridObject: [],
  setTileGridObject: () => {},
});
