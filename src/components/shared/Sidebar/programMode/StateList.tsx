import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PROGRAM_MODE_NEW } from "../../../../utils/constants";
import {
  SidebarHorizContainer,
  StatesListContainer,
} from "../../../Containers";
import { ProgramModeContext } from "../../../context/programModeContext";
import { TextButton } from "../../Atoms/TextButton";
import StatePreview from "./StatePreview";

const StateList = () => {
  const navigate = useNavigate();
  const { programModeStates } = useContext(ProgramModeContext);

  const noStatesSet = useMemo(() => {
    return programModeStates.length === 0;
  }, [programModeStates]);

  const onCreateState = () => {
    navigate(ROUTE_PROGRAM_MODE_NEW);
  };

  return (
    <>
      <SidebarHorizContainer>
        <span>States</span>
        <TextButton onClick={onCreateState}>+</TextButton>
      </SidebarHorizContainer>
      <StatesListContainer>
        {noStatesSet && "No states yet"}
        {!noStatesSet &&
          programModeStates.map((stateObject, i) => {
            return (
              <StatePreview
                stateObject={stateObject}
                index={i}
                key={stateObject.id}
              />
            );
          })}
      </StatesListContainer>
    </>
  );
};

export default StateList;
