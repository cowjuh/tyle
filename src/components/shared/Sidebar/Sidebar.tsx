import styled from "styled-components";
import ColorPicker from "../ColorPicker/ColorPicker";
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
  return (
    <SidebarContainer>
      <Tabs />
      <ColorPicker />
    </SidebarContainer>
  );
};

export default Sidebar;
