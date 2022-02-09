import { createContext, useContext } from "react";
import { PlaygroundMode, PlaygroundModeEnum, TileGrid } from "../types/types";

interface GlobalContextProps {
  playgroundMode: PlaygroundMode;
  setPlaygroundMode: (mode: PlaygroundMode) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  playgroundMode: PlaygroundModeEnum.data,
  setPlaygroundMode: () => {},
});
