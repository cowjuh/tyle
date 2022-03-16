import styled from "styled-components";
import Tile from "../../shared/Tile/Tile";
import Selecto, { OnSelect } from "react-selecto";
import { useContext, useEffect, useState } from "react";
import { DrawModeContext } from "../../context/drawModeContext";
import { useLocation } from "react-router-dom";
import { convertNumberToLetter, getStateId } from "../../../utils/helpers";
import { GlobalContext } from "../../context/globalContext";

const TILE_CANVAS_ID = "tile-canvas-container";

const TileCanvasContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`;

const TileRowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`;

const TileNumberContainer = styled.div`
  width: 15px;
  height: 15px;
  padding: 10px 0;
`;

const TileColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// TODO: LED selection bug
const ProgramModeTileCanvas = () => {
  const location = useLocation();
  const stateId = getStateId(location.pathname); // undefined if no existing stateId exists
  const [isSelecting, setIsSelecting] = useState(false);
  const { globalTileGridObject } = useContext(GlobalContext);
  useEffect(() => {
    console.log(location.pathname.split("/"));
    if (location.pathname.split("/").length === 4) {
      setIsSelecting(true);
    } else {
      setIsSelecting(false);
    }
  }, [location, isSelecting]);
  const onSelect: any = (e: OnSelect<Selecto>) => {
    e.added.forEach((el) => {
      el.classList.add("selected-program-mode");
    });
    e.removed.forEach((el) => {
      el.classList.remove("selected-program-mode");
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
      {globalTileGridObject.map((tileRow, rowIndex) => {
        return (
          <TileRowContainer>
            <TileNumberContainer>{rowIndex}</TileNumberContainer>
            {tileRow.map((tile, columnIndex) => {
              const columnLetter = convertNumberToLetter(columnIndex);
              return (
                <TileColumnContainer>
                  {rowIndex === 0 && (
                    <TileNumberContainer>{columnLetter}</TileNumberContainer>
                  )}
                  <Tile tileObject={tile} hideLEDs={!isSelecting} />
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
