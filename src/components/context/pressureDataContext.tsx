import { createContext, ReactChild, useEffect, useState } from "react";
import { TileGridPressure } from "../types/types";

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
    useState<TileGridPressure>([{ tileId: 1, values: [1, 2, 3, 4] }]);

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
