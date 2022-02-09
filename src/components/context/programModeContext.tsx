import { createContext } from "react";
import {
  ProgramModeStateObject,
  ProgramModeStatesObject,
} from "../types/types";

interface ProgramModeContextProps {
  programModeStates: Array<ProgramModeStateObject>;
  setProgramModeStates: (statesObject: ProgramModeStatesObject) => void;
}

export const ProgramModeContext = createContext<ProgramModeContextProps>({
  programModeStates: [],
  setProgramModeStates: () => {},
});
