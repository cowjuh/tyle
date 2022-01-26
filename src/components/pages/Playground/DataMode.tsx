import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import Sidebar from "./Sidebar/Sidebar";
import TileCanvas from "./TileCanvas";

const DataMode = () => {
  return (
    <FullWidthHeightCenteredContainer>
      <PlayGroundParentContainer>
        <Sidebar />
        <TileCanvas />
      </PlayGroundParentContainer>
    </FullWidthHeightCenteredContainer>
  );
};

export default DataMode;
