import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import Sidebar from "../../shared/Sidebar/Sidebar";
import TileCanvas from "./DrawModeTileCanvas";

const DrawingMode = () => {
  return (
    <FullWidthHeightCenteredContainer>
      <PlayGroundParentContainer>
        <Sidebar />
        <TileCanvas />
      </PlayGroundParentContainer>
    </FullWidthHeightCenteredContainer>
  );
};

export default DrawingMode;
