import { useContext, useMemo, useState } from "react";
import { SidebarHorizContainer, SidebarInnerContainer } from "../../Containers";
import { ProgramModeContext } from "../../context/programModeContext";
import { useProgramModeContext } from "../../hooks/useProgramModeContext";
import { Color, StateOperator } from "../../types/types";
import StateCreator from "./programMode/StateCreator";
import StateEditor from "./programMode/StateEditor";
import StatePreview from "./programMode/StatePreview";

const SidebarProgramMode = () => {
  const [previewing, setPreviewing] = useState<boolean>(true);
  const [creatingNewState, setCreatingNewState] = useState<boolean>(false);
  const onExpand = () => {
    previewing && setPreviewing(!previewing);
  };
  const { updateProgramModeStates, createProgramModeState } =
    useProgramModeContext();
  const onNewState = () => {
    setCreatingNewState(true);
  };
  const { programModeStates } = useContext(ProgramModeContext);

  const noStatesSet = useMemo(() => {
    return programModeStates.length == 0;
  }, [programModeStates]);

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

  // TODO: Turn the props into a type
  const onCreate = (
    color: Color,
    operator: StateOperator,
    input1: number,
    input2?: number
  ) => {
    createProgramModeState(color, operator, input1, input2);
    setPreviewing(true);
    setCreatingNewState(false);
  };

  return (
    <>
      <SidebarHorizContainer>
        <span>States</span>
        <button onClick={onNewState}>New State</button>
      </SidebarHorizContainer>
      {noStatesSet && "No states yet"}
      {!noStatesSet &&
        programModeStates.map((stateObject, i) => {
          return (
            <SidebarInnerContainer>
              <StatePreview stateObject={stateObject} index={i} />
            </SidebarInnerContainer>
          );
        })}

      {creatingNewState && (
        <SidebarInnerContainer onClick={onExpand}>
          <StateCreator onCreate={onCreate} />
        </SidebarInnerContainer>
      )}
    </>
  );
};

export default SidebarProgramMode;
