import styled from "styled-components";
import { TILE_CONTAINER_CLASSNAME } from "../../../utils/constants";
import {
  LEDRowT,
  SingleLEDPattern,
  TileIdObject,
  TileObject,
} from "../../types/types";
import LED from "./LED";

interface TileProps {
  tileObject: TileObject;
  hideLEDs?: boolean;
  tileIdInternal: TileIdObject;
  value?: number | string;
}

interface LEDRowProps {
  ledRow: LEDRowT;
  tileObject: TileObject;
  ledRowId: number;
}

interface LEDRowContainerProps {
  ledRowId: number;
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

const LEDRowContainer = styled.div<LEDRowContainerProps>`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: space-between;
`;

const Tile: React.FC<TileProps> = ({
  tileObject,
  hideLEDs,
  tileIdInternal,
  value,
}) => {
  const tileIdInternalString: string = `tile-${tileIdInternal.letter}-${tileIdInternal.num}`;
  const isEmpty = tileObject.tileId === 0;
  return (
    <TileContainer
      id={tileIdInternalString}
      className={TILE_CONTAINER_CLASSNAME}
    >
      {!isEmpty &&
        !hideLEDs &&
        tileObject.ledConfig.map((ledRow: LEDRowT, i: number) => {
          return (
            <LEDRow
              key={i}
              ledRow={ledRow}
              tileObject={tileObject}
              ledRowId={i}
            />
          );
        })}
      {isEmpty && "Empty space"}
      {!isEmpty && value && value}
    </TileContainer>
  );
};

const LEDRow: React.FC<LEDRowProps> = ({ ledRow, tileObject, ledRowId }) => {
  return (
    <LEDRowContainer ledRowId={ledRowId}>
      {ledRow.map((ledObject: SingleLEDPattern, i: number) => {
        return (
          <LED
            ledObject={ledObject}
            ledId={i}
            key={i}
            tileId={tileObject.tileId}
            ledRowId={ledRowId}
          />
        );
      })}
    </LEDRowContainer>
  );
};

export default Tile;
