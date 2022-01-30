import styled from "styled-components";
import { Colors } from "../../types/types";
import ColorPickerButton from "./ColorPickerButton";

const ColorPickerContainer = styled.div``;

const ColorPaletteContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`;

const ColorPicker = () => {
  return (
    <ColorPickerContainer>
      <h4>LED Color</h4>
      <ColorPaletteContainer>
        {Object.keys(Colors).map((color: string) => {
          return <ColorPickerButton color={color} />;
        })}
      </ColorPaletteContainer>
    </ColorPickerContainer>
  );
};

export default ColorPicker;
