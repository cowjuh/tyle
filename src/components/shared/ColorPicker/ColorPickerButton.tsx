import styled from "styled-components";
import { useTileGridContext } from "../../hooks/useTileGridContext";
import { Color } from "../../types/types";

interface ColorPickerButtonProps {
  onSetColor?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: Color
  ) => void;
  color: string;
  disabled?: boolean;
}

const ColorPickerButtonContainer = styled.button`
  border-radius: 100%;
  background: ${(p) => (p.color === Color.none ? "" : p.color)};
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
  const colorEnum = Color[color as keyof typeof Color];
  return (
    <ColorPickerButtonContainer
      color={colorEnum}
      onMouseDown={(e) => onSetColor && onSetColor(e, colorEnum)}
      disabled={disabled}
    />
  );
};

export default ColorPickerButton;
