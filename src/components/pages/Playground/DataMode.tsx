import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getDrawModeTileGridObject } from "../../../utils/helpers";
import {
  FullWidthHeightCenteredContainer,
  HorizontalDivider,
  PlayGroundParentContainer,
  TileCanvasContainer,
} from "../../Containers";
import { DrawModeContext } from "../../context/drawModeContext";
import { GlobalContext } from "../../context/globalContext";
import {
  PressureDataContext,
  PressureDataProvider,
} from "../../context/pressureDataContext";
import Sidebar from "../../shared/Sidebar/Sidebar";
import { TileGridObject, TileGridPressure } from "../../types/types";
import DataModeTileCanvas from "./DataModeTileCanvas";
import TileCanvas from "./DrawModeTileCanvas";

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
  width: 600px;
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
  const { globalTileGridObject } = useContext(GlobalContext);
  const { pressureDataObject, setPressureDataObject } =
    useContext(PressureDataContext);
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
            value={JSON.stringify(pressureDataObject)}
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
