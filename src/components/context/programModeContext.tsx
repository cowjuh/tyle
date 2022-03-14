import { createContext } from "react";
import {
  Color,
  ProgramModeStateObject,
  ProgramModeStatesObject,
  StateOperator,
} from "../types/types";

interface ProgramModeContextProps {
  programModeStates: ProgramModeStatesObject;
  setProgramModeStates: (statesObject: ProgramModeStatesObject) => void;
}

const mockProgramModeState: ProgramModeStateObject = {
  color: Color.blue,
  id: "1",
  operator: StateOperator.greaterThan,
  primaryInputValue: 200,
  selectedLEDs: ["hello"],
};

export const ProgramModeContext = createContext<ProgramModeContextProps>({
  programModeStates: [mockProgramModeState],
  setProgramModeStates: () => {},
});
