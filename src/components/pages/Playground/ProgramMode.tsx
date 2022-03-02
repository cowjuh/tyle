import { useState } from "react";
import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import { ProgramModeContext } from "../../context/programModeContext";
import Sidebar from "../../shared/Sidebar/Sidebar";
import {
  Color,
  ProgramModeStateObject,
  ProgramModeStatesObject,
  StateOperator,
} from "../../types/types";
import TileCanvas from "./TileCanvas";

const mockProgramModeState: ProgramModeStateObject = {
  color: Color.blue,
  id: "1",
  operator: StateOperator.greaterThan,
  primaryInputValue: 200,
  selectedLEDs: ["hello"],
};

const ProgramMode = () => {
  const [programModeStates, setProgramModeStates] =
    useState<ProgramModeStatesObject>([]);
  const [tempVal, setTempVal] = useState("MY TEMP VAL");
  const tileGridContextValue = {
    programModeStates,
    setProgramModeStates,
    tempVal,
    setTempVal,
  };

  return (
    <ProgramModeContext.Provider value={tileGridContextValue}>
      <FullWidthHeightCenteredContainer>
        <PlayGroundParentContainer>
          <Sidebar />
          <TileCanvas />
        </PlayGroundParentContainer>
      </FullWidthHeightCenteredContainer>
    </ProgramModeContext.Provider>
  );
};

export default ProgramMode;
