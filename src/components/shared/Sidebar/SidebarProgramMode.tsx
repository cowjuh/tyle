import { useState } from "react";
import { SidebarHorizContainer, SidebarInnerContainer } from "../../Containers";
import { useProgramModeContext } from "../../hooks/useProgramModeContext";
import { Color, StateOperator } from "../../types/types";
import StateEditor from "./programMode/StateEditor";
import StatePreview from "./programMode/StatePreview";

const SidebarProgramMode = () => {
  const [previewing, setPreviewing] = useState<boolean>(true);
  const [creatingNewState, setCreatingNewState] = useState<boolean>(false);
  const onExpand = () => {
    previewing && setPreviewing(!previewing);
  };
  const [updateProgramModeStates] = useProgramModeContext();
  const onNewState = () => {
    setCreatingNewState(true);
  };

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
        <button onClick={onNewState}>New State</button>
      </SidebarHorizContainer>

      <SidebarInnerContainer onClick={onExpand}>
        {previewing && <StatePreview />}
      </SidebarInnerContainer>
      {creatingNewState && (
        <SidebarInnerContainer onClick={onExpand}>
          <StateEditor onSave={onSave} />
        </SidebarInnerContainer>
      )}
    </>
  );
};

export default SidebarProgramMode;
