import { useState } from "react";
import { SidebarHorizContainer, SidebarInnerContainer } from "../../Containers";
import { useProgramModeContext } from "../../hooks/useProgramModeContext";
import { Color, StateOperator } from "../../types/types";
import StateEditor from "./programMode/StateEditor";
import StatePreview from "./programMode/StatePreview";

const SidebarProgramMode = () => {
  const [previewing, setPreviewing] = useState<boolean>(true);
  const onExpand = () => {
    previewing && setPreviewing(!previewing);
  };
  const [updateProgramModeStates] = useProgramModeContext();

  // TODO: Turn the props into a type
  const onSave = (
    id: string,
    color: Color,
    operator: StateOperator,
    input1: number,
    input2?: number
  ) => {
    updateProgramModeStates(id, color, operator, input1, input2);
    setPreviewing(true);
  };
  return (
    <>
      <SidebarHorizContainer>
        <span>States</span>
        <button>New State</button>
      </SidebarHorizContainer>

      <SidebarInnerContainer onClick={onExpand}>
        {previewing && <StatePreview />}
        {!previewing && <StateEditor onSave={onSave} />}
      </SidebarInnerContainer>
    </>
  );
};

export default SidebarProgramMode;
