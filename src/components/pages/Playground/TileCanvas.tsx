import styled from "styled-components";
import Tile from "./Tile/Tile";

const TileCanvasContainer = styled.div`
  width: 100%;
`;

const TileCanvas = () => {
  return (
    <TileCanvasContainer>
      <Tile />
    </TileCanvasContainer>
  );
};

export default TileCanvas;