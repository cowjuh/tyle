import { useEffect } from "react";
import styled from "styled-components";
import { constructLEDId } from "../../../utils/helpers";
import { SingleLEDPattern } from "../../types/types";

interface LEDProps {
  tileId: string;
  ledId: number;
  ledRowId: number;
  ledObject: SingleLEDPattern;
}

const LEDContainer = styled.div<LEDProps>`
  border-radius: 100%;
  background: ${(p: LEDProps) =>
    p.ledObject.color +
    (p.ledObject.opacity === 100 ? "" : p.ledObject.opacity)};
  width: 20px;
  height: 20px;
  background: ${(p) => (p.className?.includes("selected") ? "white" : "")};
  cursor: pointer;
`;

const LED: React.FC<LEDProps> = ({ tileId, ledId, ledRowId, ledObject }) => {
  const id = constructLEDId(tileId, ledRowId, ledId);
  useEffect(() => {
    document.getElementById(id);
    console.log("Something");
  }, []);

  return (
    <LEDContainer
      className="led"
      tileId={tileId}
      ledId={ledId}
      ledObject={ledObject}
      ledRowId={ledRowId}
      id={id}
    />
  );
};

export default LED;
