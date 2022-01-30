import styled from "styled-components";
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
  const onClick = () => {
    console.log("I got clicked");
  };
  return <ColorPickerButtonContainer color={color} onClick={onClick} />;
};

export default ColorPickerButton;
