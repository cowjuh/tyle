import { createContext } from "react";
import {
  DStreamTileGridObject,
  PlaygroundMode,
  PlaygroundModeEnum,
} from "../types/types";

export interface GlobalContextProps {
  playgroundMode: PlaygroundMode;
  setPlaygroundMode: (mode: PlaygroundMode) => void;
  globalTileGrid: DStreamTileGridObject;
}

export const GlobalContext = createContext<GlobalContextProps>({
  playgroundMode: PlaygroundModeEnum.data,
  setPlaygroundMode: () => {},
  globalTileGrid: [],
});
