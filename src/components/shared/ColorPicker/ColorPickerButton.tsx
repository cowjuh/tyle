import { useContext } from "react";
import styled from "styled-components";
import {
  getUpdatedTileGridObject,
  setDrawModeTileGridObject,
} from "../../../utils/helpers";
import { TileGridContext } from "../../context/tileGridContext";
import { useGlobalContext } from "../../hooks/globalContext";
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
  const colorEnum = Colors[color as keyof typeof Colors];
  const [updateTileGridObject] = useGlobalContext(colorEnum);
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    updateTileGridObject();
  };
  return (
    <ColorPickerButtonContainer
      color={colorEnum}
      onMouseDown={(e) => onClick(e)}
    />
  );
};

export default ColorPickerButton;
