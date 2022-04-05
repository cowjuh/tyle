import { createContext, ReactChild, useState } from "react";
import { TileGridPressure } from "../../utils/types";

interface IPressureDataContext {
  pressureDataObject: TileGridPressure;
  setPressureDataObject: (tileGridPressure: TileGridPressure) => void;
}

export const PressureDataContext = createContext<IPressureDataContext>({
  pressureDataObject: [],
  setPressureDataObject: () => {},
});

interface IPressureDataProvider {
  children: ReactChild;
}

export const PressureDataProvider = (props: IPressureDataProvider) => {
  const [pressureDataObject, setPressureDataObject] =
    useState<TileGridPressure>([]);

  const pressureDataContextValue = {
    pressureDataObject,
    setPressureDataObject,
  };

  return (
    <PressureDataContext.Provider value={pressureDataContextValue}>
      {props.children}
    </PressureDataContext.Provider>
  );
};
