import { createContext, useContext } from "react";
import { TileGrid } from "../types/types";

interface TileGridContextProps {
  tileGridObject: TileGrid;
  setTileGridObject: (tileGridObject: TileGrid) => void;
}

export const TileGridContext = createContext<TileGridContextProps>({
  tileGridObject: [],
  setTileGridObject: () => {},
});
