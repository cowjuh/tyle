import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/globalContext";
import { PlaygroundModeEnum } from "../../types/types";
import SidebarDrawMode from "./SidebarDrawMode";
import SidebarProgramMode from "./SidebarProgramMode";
import Tabs from "./Tabs";

const SidebarContainer = styled.div`
  border-right: 1px solid black;
  padding: 30px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 30px;
  background: #ffffff10;
`;

const Sidebar = () => {
  const { playgroundMode } = useContext(GlobalContext);
  return (
    <SidebarContainer>
      <Tabs />
      {playgroundMode === PlaygroundModeEnum.draw && <SidebarDrawMode />}
      {playgroundMode === PlaygroundModeEnum.program && <SidebarProgramMode />}
    </SidebarContainer>
  );
};

export default Sidebar;
