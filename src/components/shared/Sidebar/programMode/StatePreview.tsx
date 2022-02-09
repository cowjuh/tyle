import { SidebarHorizContainer } from "../../../Containers";
import { Color } from "../../../types/types";
import ColorPickerButton from "../../ColorPicker/ColorPickerButton";
import styled from "styled-components";

interface StatePreviewProps {}

const StatePreviewContainer = styled(SidebarHorizContainer)`
  cursor: pointer;
`;

const StatePreview: React.FC<StatePreviewProps> = () => {
  return (
    <StatePreviewContainer>
      <span>
        <b>1</b>
      </span>
      <span>P {">"} 120 N</span>
      <ColorPickerButton disabled={true} color={Color.pink} />
    </StatePreviewContainer>
  );
};

export default StatePreview;
