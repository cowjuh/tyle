import styled from "styled-components";
import { applyColorToTileGridObject } from "../../../utils/helpers";
import { Colors } from "../../types/types";

interface ColorPickerButtonProps {
  color: string;
}

const ColorPickerButtonContainer = styled.button`
  border-radius: 100%;
  background: ${(p) => (p.color === Colors.none ? "" : p.color)};
  border: 1px solid #ffffff40;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &:hover {
    opacity: 70%;
  }
`;

const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({ color }) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("I got clicked");
    applyColorToTileGridObject(Colors[color as keyof typeof Colors]);
  };
  return (
    <ColorPickerButtonContainer
      color={Colors[color as keyof typeof Colors]}
      onMouseDown={(e) => onClick(e)}
    />
  );
};

export default ColorPickerButton;
