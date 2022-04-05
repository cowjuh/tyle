import { createContext, ReactChild, RefObject, useState } from "react";
import Selecto, { OnSelect } from "react-selecto";
import { getLocalStorageItem } from "../../utils/helpers";
import { LocalStorageKeys, TileGridObject } from "../../utils/types";

//TODO: Change globalTileGrid to not optional
export interface GlobalContextProps {
  globalTileGridObject: TileGridObject;
  setGlobalTileGridObject: (obj: TileGridObject) => void;
  selectoRef: RefObject<Selecto> | null;
  setSelectoRef: (e: RefObject<Selecto>) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  globalTileGridObject: [],
  setGlobalTileGridObject: () => {},
  selectoRef: null,
  setSelectoRef: () => {},
});

interface IGlobalContextProvider {
  children: ReactChild;
}

export const GlobalContextProvider = (props: IGlobalContextProvider) => {
  const [globalTileGridObject, setGlobalTileGridObject] =
    useState<TileGridObject>(
      getLocalStorageItem(LocalStorageKeys.GLOBAL_TILE_GRID_LS_OBJ || [])
    );
  const [selectoEvent, setSelectoEvent] = useState<RefObject<Selecto> | null>(
    null
  );
  const globalContextValue: GlobalContextProps = {
    globalTileGridObject,
    setGlobalTileGridObject,
    selectoRef: selectoEvent,
    setSelectoRef: setSelectoEvent,
  };
  return (
    <GlobalContext.Provider value={globalContextValue}>
      {props.children}
    </GlobalContext.Provider>
  );
};
