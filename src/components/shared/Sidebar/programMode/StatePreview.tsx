import { SidebarHorizContainer } from "../../../Containers";
import {
  Color,
  ProgramModeStateObject,
  StateOperator,
  StateOperatorSymbols,
} from "../../../types/types";
import ColorPickerButton from "../../ColorPicker/ColorPickerButton";
import styled from "styled-components";

interface StatePreviewProps {
  stateObject: ProgramModeStateObject;
  index: number;
}

const StatePreviewContainer = styled(SidebarHorizContainer)`
  cursor: pointer;
`;

const StatePreview: React.FC<StatePreviewProps> = ({ stateObject, index }) => {
  const {
    color,
    id,
    operator,
    primaryInputValue,
    selectedLEDs,
    secondaryInputValue,
  } = stateObject;
  const isBetweenOperator = operator == StateOperator.between;
  return (
    <StatePreviewContainer>
      <span>
        <b>{index + 1}</b>
      </span>
      <span>
        {isBetweenOperator &&
          `${primaryInputValue} < P < ${secondaryInputValue}`}
        {!isBetweenOperator &&
          `P ${StateOperatorSymbols[operator]} ${primaryInputValue}`}
      </span>
      <ColorPickerButton disabled={true} color={color} />
    </StatePreviewContainer>
  );
};

export default StatePreview;
