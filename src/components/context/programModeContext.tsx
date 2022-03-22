import { createContext } from "react";
import {
  Color,
  ProgramModeStateObject,
  ProgramModeStatesObject,
  StateOperator,
  TileGridObject,
} from "../types/types";

interface ProgramModeContextProps {
  programModeStates: ProgramModeStatesObject;
  setProgramModeStates: (statesObject: ProgramModeStatesObject) => void;
  // used to temporarily make adjustments to tile grid object of a state
  tempTileGridObject: TileGridObject;
  setTempTileGridObject: (tileGridObject: TileGridObject) => void;
}

const mockProgramModeState: ProgramModeStateObject = {
  color: Color.blue,
  id: "1",
  operator: StateOperator.greaterThan,
  primaryInputValue: 200,
  selectedLEDs: ["hello"],
  tileId: { letter: "A", num: 0 },
};

export const ProgramModeContext = createContext<ProgramModeContextProps>({
  programModeStates: [mockProgramModeState],
  setProgramModeStates: () => {},
  tempTileGridObject: [],
  setTempTileGridObject: () => {},
});
