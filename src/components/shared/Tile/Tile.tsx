import styled from "styled-components";
import { LEDRowT, SingleLEDPattern, TileObject } from "../../types/types";
import LED from "./LED";

interface TileProps {
  tileObject: TileObject;
}

interface LEDRowProps {
  ledRow: LEDRowT;
  tileObject: TileObject;
}

const TileContainer = styled.div`
  border: 3px solid #ffffff40;
  border-radius: 10px;
  padding: 10px;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  justify-content: center;
`;

const LEDRowContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  justify-content: space-between;
`;

const Tile: React.FC<TileProps> = ({ tileObject }) => {
  return (
    <TileContainer>
      {tileObject.tileId !== "empty" &&
        tileObject.ledConfig.map((ledRow: LEDRowT) => {
          return <LEDRow ledRow={ledRow} tileObject={tileObject} />;
        })}
    </TileContainer>
  );
};

// TODO - Fix key and parentKey props for LED

const LEDRow: React.FC<LEDRowProps> = ({ ledRow, tileObject }) => {
  return (
    <LEDRowContainer>
      {ledRow.map((ledObject: SingleLEDPattern) => {
        return (
          <LED ledObject={ledObject} ledId={"key"} tileId={tileObject.tileId} />
        );
      })}
    </LEDRowContainer>
  );
};

export default Tile;
