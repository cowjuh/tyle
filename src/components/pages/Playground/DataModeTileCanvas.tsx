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
import Tile from "../../shared/Tile/Tile";
import { TileIdObject } from "../../types/types";

const DataModeTileCanvas = () => {
  const { globalTileGridObject } = useContext(GlobalContext);
  return (
    <TileCanvasContainer id={TILE_CANVAS_ID}>
      {globalTileGridObject.map((tileRow, rowIndex) => {
        return (
          <TileRowContainer key={rowIndex}>
            <TileNumberContainer>{rowIndex}</TileNumberContainer>

            {tileRow.map((tile, columnIndex) => {
              const columnLetter = convertNumberToLetter(columnIndex);
              const tileIdInternal: TileIdObject = {
                letter: columnLetter,
                num: rowIndex,
              };
              return (
                <TileColumnContainer key={columnIndex}>
                  {rowIndex === 0 && (
                    <TileNumberContainer>{columnLetter}</TileNumberContainer>
                  )}
                  <Tile tileObject={tile} tileIdInternal={tileIdInternal} />
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
