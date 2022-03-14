import styled from "styled-components";
import { Color } from "../../types/types";
import ColorPickerButton from "./ColorPickerButton";

interface ColorPickerProps {
  onSetColor: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: Color
  ) => void;
}

const ColorPickerContainer = styled.div``;

const ColorPaletteContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`;

// TODO: Add clear all button
const ColorPicker: React.FC<ColorPickerProps> = ({ onSetColor }) => {
  return (
    <ColorPickerContainer>
      <ColorPaletteContainer>
        {Object.keys(Color).map((color: string) => {
          const colorHEX = Color[color as keyof typeof Color];
          return <ColorPickerButton color={colorHEX} onSetColor={onSetColor} />;
        })}
      </ColorPaletteContainer>
    </ColorPickerContainer>
  );
};

export default ColorPicker;
