import { useState } from "react";
import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import { ProgramModeContext } from "../../context/programModeContext";
import Sidebar from "../../shared/Sidebar/Sidebar";
import { ProgramModeStatesObject } from "../../types/types";
import TileCanvas from "./TileCanvas";

const ProgramMode = () => {
  const [programModeStates, setProgramModeStates] =
    useState<ProgramModeStatesObject>([]);
  const tileGridContextValue = {
    programModeStates,
    setProgramModeStates,
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
