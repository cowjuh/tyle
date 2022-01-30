import styled from "styled-components";
import Tile from "../../shared/Tile/Tile";
import { TileGrid, TileObject } from "../../types/types";
import Selecto, { OnSelect } from "react-selecto";

interface TileCanvasProps {
  tileGrid: TileGrid;
}

const TileCanvasContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`;

const TileRowContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const TileCanvas: React.FC<TileCanvasProps> = ({ tileGrid }) => {
  const onSelect: any = (e: OnSelect<Selecto>) => {
    e.added.forEach((el) => {
      el.classList.add("selected");
    });
    e.removed.forEach((el) => {
      el.classList.remove("selected");
    });
  };
  return (
    <TileCanvasContainer id="tile-canvas-container">
      <Selecto
        container={document.body}
        dragContainer={window}
        selectableTargets={[".led"]}
        selectFromInside={false}
        continueSelect={true}
        toggleContinueSelect={"shift"}
        keyContainer={window}
        hitRate={20}
        onSelect={onSelect}
      />
      {tileGrid.map((tileRow) => {
        return (
          <TileRowContainer>
            {tileRow.map((tile) => {
              return <Tile tileObject={tile} />;
            })}
          </TileRowContainer>
        );
      })}
    </TileCanvasContainer>
  );
};

export default TileCanvas;
