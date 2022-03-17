import styled from "styled-components";
import { HorizontalDivider } from "../../Containers";
import { useRouteLocation } from "../../hooks/useRouteLocation";
import { PlaygroundModeEnum } from "../../types/types";
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
  const onSync = () => {
    if (window.confirm("This action will reset all your states")) {
      console.log("Sync everything");
    } else {
      console.log("User cancelled");
    }
  };

  const onEmit = () => {
    console.log("Emitting here");
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
        <Button onClick={onEmit}>Emit Data</Button>
        <TextButton onClick={onSync}>Sync Tile Grid</TextButton>
      </UpperContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
