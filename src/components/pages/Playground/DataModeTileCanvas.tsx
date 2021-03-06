import { useContext } from "react";
import { TILE_CANVAS_ID } from "../../../utils/constants";
import { convertNumberToLetter } from "../../../utils/helpers";
import {
  TileCanvasContainer,
  TileColumnContainer,
  TileNumberContainer,
  TileRowContainer,
} from "../../Containers";
import { GlobalContext } from "../../context/globalContext";
import { PressureDataContext } from "../../context/pressureDataContext";
import Tile from "../../shared/Tile/Tile";
import { TileIdObject } from "../../../utils/types";

const DataModeTileCanvas = () => {
  const { globalTileGridObject } = useContext(GlobalContext);
  const { pressureDataObject } = useContext(PressureDataContext);
  return (
    <TileCanvasContainer id={TILE_CANVAS_ID}>
      {pressureDataObject !== [] &&
        globalTileGridObject.map((tileRow, rowIndex) => {
          return (
            <TileRowContainer key={rowIndex}>
              <TileNumberContainer>{rowIndex}</TileNumberContainer>

              {tileRow.map((tile, columnIndex) => {
                const columnLetter = convertNumberToLetter(columnIndex);
                const tileIdInternal: TileIdObject = {
                  letter: columnLetter,
                  num: rowIndex,
                };
                const value = pressureDataObject[tile.tileId - 1];

                const avg =
                  (value &&
                    value?.values.reduce((a, b) => a + b, 0) /
                      value.values.length) ||
                  0;

                return (
                  <TileColumnContainer key={columnIndex}>
                    {rowIndex === 0 && (
                      <TileNumberContainer>{columnLetter}</TileNumberContainer>
                    )}
                    <Tile
                      tileObject={tile}
                      tileIdInternal={tileIdInternal}
                      hideLEDs
                      value={avg || 0}
                    />
                  </TileColumnContainer>
                );
              })}
            </TileRowContainer>
          );
        })}
    </TileCanvasContainer>
  );
};

export default DataModeTileCanvas;
