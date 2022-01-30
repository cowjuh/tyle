import styled from "styled-components";
import { SingleLEDPattern } from "../../types/types";

interface LEDProps {
  tileId: string;
  ledId: string;
  ledObject: SingleLEDPattern;
}

const LEDContainer = styled.div<LEDProps>`
  border-radius: 100%;
  background: ${(p: LEDProps) =>
    p.ledObject.color +
    (p.ledObject.opacity === 100 ? "" : p.ledObject.opacity)};
  width: 20px;
  height: 20px;
`;

const LED: React.FC<LEDProps> = ({ tileId, ledId, ledObject }) => {
  return <LEDContainer tileId={tileId} ledId={ledId} ledObject={ledObject} />;
};

export default LED;
