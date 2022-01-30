import { mockTileGrid } from "../../../mockData/mockTileObject";
import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import Sidebar from "../../shared/Sidebar/Sidebar";
import TileCanvas from "./TileCanvas";

const DataMode = () => {
  return (
    <FullWidthHeightCenteredContainer>
      <PlayGroundParentContainer>
        <Sidebar />
        <TileCanvas tileGrid={mockTileGrid} />
      </PlayGroundParentContainer>
    </FullWidthHeightCenteredContainer>
  );
};

export default DataMode;
