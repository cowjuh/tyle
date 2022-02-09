import { useState } from "react";
import { SidebarHorizContainer, SidebarInnerContainer } from "../../Containers";
import { useProgramModeContext } from "../../hooks/useProgramModeContext";
import {
  Color,
  ProgramModeStateObject,
  StateOperator,
} from "../../types/types";
import State from "./programMode/State";
import StatePreview from "./programMode/StatePreview";

const SidebarProgramMode = () => {
  const [previewing, setPreviewing] = useState<boolean>(true);
  const onExpand = () => {
    previewing && setPreviewing(!previewing);
  };
  const [updateProgramModeStates] = useProgramModeContext();

  // TODO: Turn the props into a type
  const onSave = (
    color: Color,
    operator: StateOperator,
    input1: number,
    input2?: number
  ) => {
    updateProgramModeStates(color, operator, input1, input2);
    setPreviewing(true);
  };
  return (
    <>
      <SidebarHorizContainer>
        <span>States</span>
        <span>+</span>
      </SidebarHorizContainer>

      <SidebarInnerContainer onClick={onExpand}>
        {previewing && <StatePreview />}
        {!previewing && <State onSave={onSave} />}
      </SidebarInnerContainer>
    </>
  );
};

export default SidebarProgramMode;
