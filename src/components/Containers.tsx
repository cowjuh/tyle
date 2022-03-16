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
  border: 1px solid #ffffff50;
  border-radius: 5px;
  max-width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StatePreviewContainer = styled(SidebarInnerContainer)`
  cursor: pointer;
  flex-direction: row;
  justify-content: space-between;
  &:hover {
    border: 1px solid white;
  }
`;

const SidebarHorizContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StatesListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
`;

export {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
  SidebarInnerContainer,
  SidebarHorizContainer,
  StatesListContainer,
  StatePreviewContainer,
};
