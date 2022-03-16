import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../../context/globalContext";
import { useRouteLocation } from "../../hooks/useRouteLocation";
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
  const [playgroundRoute] = useRouteLocation();

  return (
    <SidebarContainer>
      <Tabs />
      {playgroundRoute === PlaygroundModeEnum.draw && <SidebarDrawMode />}
      {playgroundRoute === PlaygroundModeEnum.program && <SidebarProgramMode />}
    </SidebarContainer>
  );
};

export default Sidebar;
