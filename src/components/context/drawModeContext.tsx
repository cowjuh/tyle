import { createContext, ReactChild, useContext, useState } from "react";
import { getLocalStorageItem } from "../../utils/helpers";
import { LocalStorageKeys, TileGridObject } from "../../utils/types";
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
    useState<TileGridObject>(
      getLocalStorageItem(LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ) ||
        globalTileGridObject
    );
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
