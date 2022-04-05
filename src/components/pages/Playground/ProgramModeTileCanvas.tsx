import Tile from "../../shared/Tile/Tile";
import Selecto, { OnSelect } from "react-selecto";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { convertNumberToLetter } from "../../../utils/helpers";
import { TileIdObject } from "../../types/types";
import {
  TileCanvasContainer,
  TileColumnContainer,
  TileNumberContainer,
  TileRowContainer,
} from "../../Containers";
import { TILE_CANVAS_ID } from "../../../utils/constants";
import { ProgramModeContext } from "../../context/programModeContext";

// TODO: LED selection bug
const ProgramModeTileCanvas = () => {
  const location = useLocation();
  const [isSelecting, setIsSelecting] = useState(false);
  const { tempTileGridObject } = useContext(ProgramModeContext);
  const [dragContainer, setDragContainer] = useState<HTMLElement | null>();

  useEffect(() => {
    if (location.pathname.split("/").length === 4) {
      setIsSelecting(true);
    } else {
      setIsSelecting(false);
    }
  }, [location, isSelecting]);

  useEffect(() => {
    setDragContainer(document.getElementById(TILE_CANVAS_ID));
  }, [dragContainer, location]);

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
        continueSelect={true}
        selectByClick={true}
        selectFromInside={true}
        keyContainer={document.getElementById(TILE_CANVAS_ID)}
        hitRate={20}
        onSelect={onSelect}
      />
      {tempTileGridObject !== [] &&
        tempTileGridObject.map((tileRow, rowIndex) => {
          return (
            <TileRowContainer>
              <TileNumberContainer>{rowIndex}</TileNumberContainer>
              {tileRow.map((tile, columnIndex) => {
                const columnLetter = convertNumberToLetter(columnIndex);
                const tileIdInternal: TileIdObject = {
                  letter: columnLetter,
                  num: rowIndex,
                };
                return (
                  <TileColumnContainer>
                    {rowIndex === 0 && (
                      <TileNumberContainer>{columnLetter}</TileNumberContainer>
                    )}
                    <Tile
                      tileObject={tile}
                      hideLEDs={!isSelecting}
                      tileIdInternal={tileIdInternal}
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

export default ProgramModeTileCanvas;
