import styled from "styled-components";
import Tabs from "./Tabs";

const SidebarContainer = styled.div`
  border-right: 1px solid black;
  padding: 20px;
  min-width: 220px;
  display: flex;
  justify-content: center;
  background: #ffffff10;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Tabs />
    </SidebarContainer>
  );
};

export default Sidebar;
