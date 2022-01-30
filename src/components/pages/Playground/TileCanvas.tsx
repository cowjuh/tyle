import styled from "styled-components";
import Tile from "../../shared/Tile/Tile";
import { TileGrid, TileObject } from "../../types/types";

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
  return (
    <TileCanvasContainer>
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
