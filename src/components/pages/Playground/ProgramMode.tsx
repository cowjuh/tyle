import { useState } from "react";
import { getLocalStorageItem } from "../../../utils/helpers";
import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import { ProgramModeContext } from "../../context/programModeContext";
import Sidebar from "../../shared/Sidebar/Sidebar";
import {
  LocalStorageKeys,
  ProgramModeStatesObject,
  TileGridObject,
} from "../../types/types";
import ProgramModeTileCanvas from "./ProgramModeTileCanvas";

// const mockProgramModeState: ProgramModeStateObject = {
//   color: Color.blue,
//   id: "1",
//   operator: StateOperator.greaterThan,
//   primaryInputValue: 200,
//   selectedLEDs: ["hello"],
// };

const ProgramMode = () => {
  const [programModeStates, setProgramModeStates] =
    useState<ProgramModeStatesObject>(
      getLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ) ||
        []
    );
  const [tempTileGridObject, setTempTileGridObject] = useState<TileGridObject>(
    []
  );
  const tileGridContextValue = {
    programModeStates,
    setProgramModeStates,
    tempTileGridObject,
    setTempTileGridObject,
  };

  return (
    <ProgramModeContext.Provider value={tileGridContextValue}>
      <FullWidthHeightCenteredContainer>
        <PlayGroundParentContainer>
          <Sidebar />
          <ProgramModeTileCanvas />
        </PlayGroundParentContainer>
      </FullWidthHeightCenteredContainer>
    </ProgramModeContext.Provider>
  );
};

export default ProgramMode;
