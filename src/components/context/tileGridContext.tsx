import { createContext } from "react";
import { TileGridObject } from "../types/types";

interface TileGridContextProps {
  tileGridObject: TileGridObject;
  setTileGridObject: (tileGridObject: TileGridObject) => void;
}

export const TileGridContext = createContext<TileGridContextProps>({
  tileGridObject: [],
  setTileGridObject: () => {},
});
