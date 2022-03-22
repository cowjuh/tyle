import { useNavigate } from "react-router-dom";
import { BASE_ROUTE_PROGRAM_MODE } from "../../../../utils/constants";
import { StatePreviewContainer } from "../../../Containers";
import {
  ProgramModeStateObject,
  StateOperator,
  StateOperatorSymbols,
} from "../../../types/types";
import ColorPickerButton from "../../ColorPicker/ColorPickerButton";

interface StatePreviewProps {
  stateObject: ProgramModeStateObject;
  index: number;
}

const StatePreview: React.FC<StatePreviewProps> = ({ stateObject, index }) => {
  const { color, operator, primaryInputValue, secondaryInputValue, tileId } =
    stateObject;
  const isBetweenOperator = operator === StateOperator.between;
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(BASE_ROUTE_PROGRAM_MODE + "/" + stateObject.id);
  };
  return (
    <StatePreviewContainer onClick={onClick}>
      <span>{tileId.letter + tileId.num}</span>
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
