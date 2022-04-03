import Tile from "../../shared/Tile/Tile";
import Selecto, { OnSelect } from "react-selecto";
import { useContext } from "react";
import { DrawModeContext } from "../../context/drawModeContext";
import { convertNumberToLetter } from "../../../utils/helpers";
import { TileIdObject } from "../../types/types";
import { TILE_CANVAS_ID } from "../../../utils/constants";
import {
  TileCanvasContainer,
  TileColumnContainer,
  TileNumberContainer,
  TileRowContainer,
} from "../../Containers";

// TODO: LED selection bug
const DrawModeTileCanvas = () => {
  const { drawModeTileGridObject: tileGridObject } =
    useContext(DrawModeContext);
  const onSelect: any = (e: OnSelect<Selecto>) => {
    e.added.forEach((el) => {
      el.classList.add("selected");
    });
    e.removed.forEach((el) => {
      el.classList.remove("selected");
    });
  };

  return (
    <TileCanvasContainer id={TILE_CANVAS_ID}>
      <Selecto
        container={document.getElementById(TILE_CANVAS_ID)}
        dragContainer={document.getElementById(TILE_CANVAS_ID) || window}
        selectableTargets={[".led"]}
        selectFromInside={false}
        continueSelect={true}
        toggleContinueSelect={"shift"}
        keyContainer={window}
        hitRate={20}
        onSelect={onSelect}
        selectByClick={true}
      />
      {tileGridObject.map((tileRow, rowIndex) => {
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

export default DrawModeTileCanvas;
