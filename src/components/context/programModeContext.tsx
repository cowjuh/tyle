import { createContext } from "react";
import { ProgramModeStatesObject, TileGridObject } from "../types/types";

interface ProgramModeContextProps {
  programModeStates: ProgramModeStatesObject;
  setProgramModeStates: (statesObject: ProgramModeStatesObject) => void;
  // used to temporarily make adjustments to tile grid object of a state
  tempTileGridObject: TileGridObject;
  setTempTileGridObject: (tileGridObject: TileGridObject) => void;
}

export const ProgramModeContext = createContext<ProgramModeContextProps>({
  programModeStates: [],
  setProgramModeStates: () => {},
  tempTileGridObject: [],
  setTempTileGridObject: () => {},
});
