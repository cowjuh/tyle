import { createContext, ReactChild, useEffect, useState } from "react";
import { tileGridPressureToStream } from "../../utils/helpers";
import { TileGridPressure } from "../../utils/types";

interface IPressureDataContext {
  pressureDataObject: TileGridPressure;
  setPressureDataObject: (tileGridPressure: TileGridPressure) => void;
  streamString: string;
  setStreamString: (str: string) => void;
}

export const PressureDataContext = createContext<IPressureDataContext>({
  pressureDataObject: [],
  setPressureDataObject: () => {},
  streamString: "",
  setStreamString: () => {},
});

interface IPressureDataProvider {
  children: ReactChild;
}

export const PressureDataProvider = (props: IPressureDataProvider) => {
  const [pressureDataObject, setPressureDataObject] =
    useState<TileGridPressure>([]);
  const [streamString, setStreamString] = useState<string>("");

  useEffect(() => {
    if (pressureDataObject.length !== 0) {
      setStreamString(
        streamString + "\n" + tileGridPressureToStream(pressureDataObject)
      );
    }
  }, [pressureDataObject]);

  const pressureDataContextValue = {
    pressureDataObject,
    setPressureDataObject,
    streamString,
    setStreamString,
  };

  return (
    <PressureDataContext.Provider value={pressureDataContextValue}>
      {props.children}
    </PressureDataContext.Provider>
  );
};
