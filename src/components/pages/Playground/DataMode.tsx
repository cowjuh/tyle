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
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  CHART_DEFAULT_SETTINGS,
  CHART_OPTIONS,
} from "../../../utils/constants";
import { usePressureDataContext } from "../../hooks/usePressureDataContext";
import { DataModeContext } from "../../context/dataModeContext";
ChartJS.register(...registerables);

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

const dataStarter = {
  labels: [],
  datasets: [],
};

const GRAPH_COLOURS = ["#A7AEF1", "#72ED7E", "#50B6FF"];

const DataMode = () => {
  const { streamString, chartData, autoscroll } =
    useContext(PressureDataContext);
  const { showChart } = useContext(DataModeContext);
  const { resetData } = usePressureDataContext();
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [dataVar, setDataVar] = useState<any>(dataStarter);

  useEffect(() => {
    var dataSetObjs = [];
    var length = 0;
    var index = 0;
    for (var dataSet in chartData) {
      dataSetObjs.push({
        ...CHART_DEFAULT_SETTINGS,
        data: chartData[dataSet],
        label: `Tile ${dataSet}`,
        borderColor: GRAPH_COLOURS[index],
        pointBorderColor: GRAPH_COLOURS[index],
        pointHoverBackgroundColor: GRAPH_COLOURS[index],
      });
      if (length === 0) length = chartData[dataSet].length;
      index++;
    }

    setDataVar({
      ...dataVar,
      datasets: dataSetObjs,
      labels: Array.from({ length }, (_, i) => i + 1),
    });
  }, [chartData]);

  useEffect(() => {
    const area = textArea.current;

    if (autoscroll && area) {
      area.scrollTop = area.scrollHeight;
    }
  });

  const onClear = () => {
    resetData();
  };

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
        </DataStreamContainer>
        <TileCanvasContainer>
          <DataModeTileCanvas />
          {showChart && (
            <Chart
              data={dataVar}
              type={"line"}
              width={100}
              height={50}
              options={CHART_OPTIONS}
            />
          )}
        </TileCanvasContainer>
      </PlayGroundParentContainer>
    </FullWidthHeightCenteredContainer>
  );
};

export default DataMode;
