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
`;

const TileCanvasContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`;

const TileRowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
`;

const TileNumberContainer = styled.div`
  width: 15px;
  height: 15px;
  padding: 10px 0;
`;

const TileColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HorizontalDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #ffffff20;
`;

const HorizButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
  SidebarInnerContainer,
  SidebarHorizContainer,
  StatesListContainer,
  StatePreviewContainer,
  TileCanvasContainer,
  TileRowContainer,
  TileNumberContainer,
  TileColumnContainer,
  HorizontalDivider,
  HorizButtonContainer,
};
