import { createContext, ReactChild, useState } from "react";
import { getLocalStorageItem } from "../../utils/helpers";
import { LocalStorageKeys, TileGridObject } from "../types/types";

//TODO: Change globalTileGrid to not optional
export interface GlobalContextProps {
  globalTileGridObject: TileGridObject;
  setGlobalTileGridObject: (obj: TileGridObject) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  globalTileGridObject: [],
  setGlobalTileGridObject: () => {},
});

interface IGlobalContextProvider {
  children: ReactChild;
}

export const GlobalContextProvider = (props: IGlobalContextProvider) => {
  const [globalTileGridObject, setGlobalTileGridObject] =
    useState<TileGridObject>(
      getLocalStorageItem(LocalStorageKeys.GLOBAL_TILE_GRID_LS_OBJ || [])
    );
  const globalContextValue: GlobalContextProps = {
    globalTileGridObject: globalTileGridObject,
    setGlobalTileGridObject: setGlobalTileGridObject,
  };
  return (
    <GlobalContext.Provider value={globalContextValue}>
      {props.children}
    </GlobalContext.Provider>
  );
};
