import styled from "styled-components";

const FullWidthHeightCenteredContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlayGroundParentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const SidebarInnerContainer = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SidebarHorizContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
  SidebarInnerContainer,
  SidebarHorizContainer,
};
