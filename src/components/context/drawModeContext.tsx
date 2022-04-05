import { createContext, ReactChild, useContext, useState } from "react";
import { TileGridObject } from "../types/types";
import { GlobalContext } from "./globalContext";

interface DrawModeContextProps {
  drawModeTileGridObject: TileGridObject;
  setDrawModeTileGridObject: (tileGridObject: TileGridObject) => void;
}

export const DrawModeContext = createContext<DrawModeContextProps>({
  drawModeTileGridObject: [],
  setDrawModeTileGridObject: () => {},
});

interface IDrawModeContextProvider {
  children: ReactChild;
}

export const DrawModeContextProvider = (props: IDrawModeContextProvider) => {
  const { globalTileGridObject } = useContext(GlobalContext);
  const [drawModeTileGridObject, setDrawModeTileGridObject] =
    useState<TileGridObject>(globalTileGridObject);
  const tileGridContextValue = {
    drawModeTileGridObject,
    setDrawModeTileGridObject,
  };
  return (
    <DrawModeContext.Provider value={tileGridContextValue}>
      {props.children}
    </DrawModeContext.Provider>
  );
};
