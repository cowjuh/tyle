import { createContext, ReactChild, useEffect, useState } from "react";
import {
  IHash,
  tileGridPressureToChartData,
  tileGridPressureToStream,
} from "../../utils/helpers";
import { TileGridPressure } from "../../utils/types";

interface IPressureDataContext {
  pressureDataObject: TileGridPressure;
  setPressureDataObject: (tileGridPressure: TileGridPressure) => void;
  streamString: string;
  setStreamString: (str: string) => void;
  chartData: IHash;
  setChartData: (hash: IHash) => void;
}

export const PressureDataContext = createContext<IPressureDataContext>({
  pressureDataObject: [],
  setPressureDataObject: () => {},
  streamString: "",
  setStreamString: () => {},
  chartData: {},
  setChartData: () => {},
});

interface IPressureDataProvider {
  children: ReactChild;
}

export const PressureDataProvider = (props: IPressureDataProvider) => {
  const [pressureDataObject, setPressureDataObject] =
    useState<TileGridPressure>([]);
  const [streamString, setStreamString] = useState<string>("");
  const [chartData, setChartData] = useState<IHash>({});

  useEffect(() => {
    if (pressureDataObject.length !== 0) {
      setStreamString(
        streamString + "\n" + tileGridPressureToStream(pressureDataObject)
      );
      setChartData(tileGridPressureToChartData(pressureDataObject, chartData));
    }
  }, [pressureDataObject]);

  const pressureDataContextValue = {
    pressureDataObject,
    setPressureDataObject,
    streamString,
    setStreamString,
    chartData,
    setChartData,
  };

  return (
    <PressureDataContext.Provider value={pressureDataContextValue}>
      {props.children}
    </PressureDataContext.Provider>
  );
};
