import styled from "styled-components";
import { useTileGridContext } from "../../hooks/useTileGridContext";
import { Colors } from "../../types/types";

interface ColorPickerButtonProps {
  color: string;
  disabled?: boolean;
}

const ColorPickerButtonContainer = styled.button`
  border-radius: 100%;
  background: ${(p) => (p.color === Colors.none ? "" : p.color)};
  border: 1px solid #ffffff40;
  width: 20px;
  height: 20px;
  cursor: pointer;
  ${(p) =>
    !p.disabled &&
    `&:hover {
      opacity: 70%;
    }`}
`;

const ColorPickerButton: React.FC<ColorPickerButtonProps> = ({
  color,
  disabled,
}) => {
  const colorEnum = Colors[color as keyof typeof Colors];
  const [updateTileGridObject] = useTileGridContext(colorEnum);
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    !disabled && updateTileGridObject();
  };
  return (
    <ColorPickerButtonContainer
      color={colorEnum}
      onMouseDown={(e) => onClick(e)}
    />
  );
};

export default ColorPickerButton;
