import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
} from "../../Containers";
import Sidebar from "../../shared/Sidebar/Sidebar";
import ProgramModeTileCanvas from "./ProgramModeTileCanvas";

// const mockProgramModeState: ProgramModeStateObject = {
//   color: Color.blue,
//   id: "1",
//   operator: StateOperator.greaterThan,
//   primaryInputValue: 200,
//   selectedLEDs: ["hello"],
// };

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
