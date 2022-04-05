import styled from "styled-components";
import { getLocalStorageItem } from "../../../utils/helpers";
import { HorizontalDivider } from "../../Containers";
import { useDrawModeContext } from "../../hooks/useDrawModeContext";
import { useProgramModeContext } from "../../hooks/useProgramModeContext";
import { useRouteLocation } from "../../hooks/useRouteLocation";
import { useWebSocket } from "../../hooks/useWebSocket";
import {
  LocalStorageKeys,
  PlaygroundModeEnum,
  TileGridObject,
} from "../../types/types";
import Button from "../Atoms/Button";
import { TextButton } from "../Atoms/TextButton";
import SidebarDrawMode from "./SidebarDrawMode";
import SidebarProgramMode from "./SidebarProgramMode";
import Tabs from "./Tabs";

const SidebarContainer = styled.div`
  border-right: 1px solid black;
  padding: 30px 20px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  gap: 30px;
  background: #ffffff10;
  position: relative;
`;

const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: stretch;
`;

const Sidebar = () => {
  const [playgroundRoute] = useRouteLocation();
  const { clearProgramModeContext } = useProgramModeContext();
  const { clearDrawModeContext } = useDrawModeContext();
  const { syncTileGrid, emitLEDPattern } = useWebSocket();

  // /**FOR TESTING ONLY, DELETE LATER */
  // useEffect(() => {
  //   var arr = [
  //     [1, 2, 3],
  //     [4, 5, 0],
  //   ];
  //   setLocalStorageItem(
  //     LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ,
  //     constructTileGridObj(arr)
  //   );
  // }, []);

  const onSync = () => {
    if (window.confirm("This action will reset all your states")) {
      console.log("Sync everything");
      clearProgramModeContext();
      clearDrawModeContext();
      syncTileGrid();
    } else {
      console.log("User cancelled");
    }
  };

  const onEmit = () => {
    const tileGridObj: TileGridObject = getLocalStorageItem(
      LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ
    );

    // TODO: Use actual new grid
    emitLEDPattern(tileGridObj);
  };

  return (
    <SidebarContainer>
      <UpperContainer>
        <Tabs />
        {playgroundRoute === PlaygroundModeEnum.draw && <SidebarDrawMode />}
        {playgroundRoute === PlaygroundModeEnum.program && (
          <SidebarProgramMode />
        )}
      </UpperContainer>
      <UpperContainer>
        <HorizontalDivider />
        <Button
          onClick={onEmit}
          disabled={playgroundRoute === PlaygroundModeEnum.data}
        >
          Emit Data
        </Button>
        <TextButton onClick={onSync}>Sync Tile Grid</TextButton>
      </UpperContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
