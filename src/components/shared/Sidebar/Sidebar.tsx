import { useEffect, useState } from "react";
import styled from "styled-components";
import { emitTileGridObject } from "../../../utils/api";
import {
  espSocket,
  socketReceiveMesage,
  socketSendMessage,
} from "../../../utils/socket";
import { HorizontalDivider } from "../../Containers";
import { useRouteLocation } from "../../hooks/useRouteLocation";
import { PlaygroundModeEnum } from "../../types/types";
import Button from "../Atoms/Button";
import { TextButton } from "../Atoms/TextButton";
import SidebarDrawMode from "./SidebarDrawMode";
import SidebarProgramMode from "./SidebarProgramMode";
import Tabs from "./Tabs";
import TempComp from "./TempComp";

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
  const [message, setMessage] = useState<string>("");

  // useEffect(() => {
  //   socketReceiveMesage();
  // });

  useEffect(() => {
    espSocket.on("receive_message", (data) => {
      setMessage(data.message);
    });
  }, [espSocket]);

  const onSync = () => {
    if (window.confirm("This action will reset all your states")) {
      console.log("Sync everything");
    } else {
      console.log("User cancelled");
    }
  };

  const onEmit = () => {
    socketSendMessage("Hello from React");
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
        <div>MSG: {message}</div>
        <TempComp />
        <HorizontalDivider />
        <Button onClick={onEmit}>Emit Data</Button>
        <TextButton onClick={onSync}>Sync Tile Grid</TextButton>
      </UpperContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
