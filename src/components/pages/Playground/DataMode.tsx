import { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { tileGridPressureToStream } from "../../../utils/helpers";
import {
  FullWidthHeightCenteredContainer,
  PlayGroundParentContainer,
  TileCanvasContainer,
} from "../../Containers";
import { PressureDataContext } from "../../context/pressureDataContext";
import Sidebar from "../../shared/Sidebar/Sidebar";
import DataModeTileCanvas from "./DataModeTileCanvas";

const DataStreamTextArea = styled.textarea`
  background: none;
  border: none;
  color: white;
  height: 100%;
  resize: none;
`;

const DataStreamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  background: #ffffff10;
  border-right: 1px solid black;
  padding: 20px;
`;

const SettingsContainer = styled.div`
  display: flex;
  border-top: 1px solid #ffffff20;
  padding: 20px 0 0 0;
  gap: 5px;
`;

const DataMode = () => {
  const { streamString } = useContext(PressureDataContext);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [autoscroll, setAutoscroll] = useState<boolean>(true);

  useEffect(() => {
    const area = textArea.current;

    if (autoscroll && area) {
      area.scrollTop = area.scrollHeight;
    }
  });

  return (
    <FullWidthHeightCenteredContainer>
      <PlayGroundParentContainer>
        <Sidebar />
        <DataStreamContainer>
          <h3>Data Stream</h3>
          <DataStreamTextArea
            value={streamString === "" ? "No data to display" : streamString}
            readOnly
            ref={textArea}
          />
          <SettingsContainer>
            <input
              type={"checkbox"}
              checked={autoscroll}
              onChange={() => setAutoscroll(!autoscroll)}
            />
            <div>Autoscroll</div>
          </SettingsContainer>
        </DataStreamContainer>
        <TileCanvasContainer>
          <DataModeTileCanvas />
        </TileCanvasContainer>
      </PlayGroundParentContainer>
    </FullWidthHeightCenteredContainer>
  );
};

export default DataMode;
