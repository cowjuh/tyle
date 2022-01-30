import { useEffect } from "react";
import styled from "styled-components";
import { TileObject } from "../../types/tileObject";

interface TileProps {
  tileObject: TileObject;
}

const TileContainer = styled.div`
  border: 3px solid #ffffff40;
  border-radius: 10px;
  padding: 10px;
  width: 120px;
  height: 120px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(4, 1fr);
`;

const LED = styled.div`
  border-radius: 100%;
  background: #ffffff40;
`;

const Tile: React.FC<TileProps> = ({ tileObject }) => {
  useEffect(() => {
    console.log(tileObject.toString());
  }, [tileObject]);
  return (
    <TileContainer>
      {tileObject.tileId !== "empty" &&
        [...Array(16)].map(() => {
          return <LED />;
        })}
    </TileContainer>
  );
};

export default Tile;
