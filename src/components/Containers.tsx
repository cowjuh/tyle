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

export { FullWidthHeightCenteredContainer, PlayGroundParentContainer };
