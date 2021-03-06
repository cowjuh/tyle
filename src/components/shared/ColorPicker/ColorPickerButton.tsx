import styled from "styled-components";
import { Color } from "../../../utils/types";

interface ColorPickerButtonProps {
  onSetColor?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: Color
  ) => void;
  color: Color;
  disabled?: boolean;
}

const ColorPickerButtonContainer = styled.button`
  border-radius: 100%;
  background: ${(p) => p.color};
  border: 1px solid #ffffff40;
  width: 20px;
  height: 20px;
  ${(p) =>
    !p.disabled &&
    `
    cursor: pointer;
    &:hover {
      opacity: 70%;
    }
    `}
`;

const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({
  onSetColor,
  color,
  disabled,
}) => {
  return (
    <ColorPickerButtonContainer
      color={color}
      onMouseDown={(e) => onSetColor && onSetColor(e, color)}
      disabled={disabled}
    />
  );
};

export default ColorPickerButton;
