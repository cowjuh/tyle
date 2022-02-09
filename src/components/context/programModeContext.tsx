import { createContext } from "react";
import { ProgramModeStateObject, TileGridObject } from "../types/types";

interface ProgramModeContextProps {
  programModeStates: Array<ProgramModeStateObject>;
  setProgramModeStates: (tileGridObject: TileGridObject) => void;
}

export const ProgramModeContext = createContext<ProgramModeContextProps>({
  programModeStates: [],
  setProgramModeStates: () => {},
});
