import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import Sidebar from "../../shared/Sidebar/Sidebar";
import ProgramModeTileCanvas from "./ProgramModeTileCanvas";

const ProgramMode = () => {
  return (
    <FullWidthHeightCenteredContainer>
      <PlayGroundParentContainer>
        <Sidebar />
        <ProgramModeTileCanvas />
      </PlayGroundParentContainer>
    </FullWidthHeightCenteredContainer>
  );
};

export default ProgramMode;
