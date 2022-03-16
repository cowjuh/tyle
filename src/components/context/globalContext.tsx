import { createContext } from "react";
import { DStreamTileGridObject, TileGridObject } from "../types/types";

//TODO: Change globalTileGrid to not optional
export interface GlobalContextProps {
  globalTileGrid?: DStreamTileGridObject;
  globalTileGridObject: TileGridObject;
}

export const GlobalContext = createContext<GlobalContextProps>({
  globalTileGrid: [],
  globalTileGridObject: [],
});
