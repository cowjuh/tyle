import { useContext } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../../context/globalContext";
import { PlaygroundModeEnum } from "../../types/types";
import ColorPicker from "../ColorPicker/ColorPicker";
import SidebarProgramMode from "./SidebarProgramMode";
import Tabs from "./Tabs";

const SidebarContainer = styled.div`
  border-right: 1px solid black;
  padding: 30px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 30px;
  background: #ffffff10;
`;

const Sidebar = () => {
  const { playgroundMode } = useContext(GlobalContext);
  return (
    <SidebarContainer>
      <Tabs />
      {playgroundMode == PlaygroundModeEnum.draw && <ColorPicker />}
      {playgroundMode == PlaygroundModeEnum.program && <SidebarProgramMode />}
    </SidebarContainer>
  );
};

export default Sidebar;
