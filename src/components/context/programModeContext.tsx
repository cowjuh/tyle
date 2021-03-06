import { createContext, ReactChild, useContext, useState } from "react";
import { getLocalStorageItem } from "../../utils/helpers";
import {
  LocalStorageKeys,
  ProgramModeStatesObject,
  TileGridObject,
} from "../../utils/types";
import { GlobalContext } from "./globalContext";

interface ProgramModeContextProps {
  programModeStates: ProgramModeStatesObject;
  setProgramModeStates: (statesObject: ProgramModeStatesObject) => void;
  // used to temporarily make adjustments to tile grid object of a state
  tempTileGridObject: TileGridObject;
  setTempTileGridObject: (tileGridObject: TileGridObject) => void;
}

export const ProgramModeContext = createContext<ProgramModeContextProps>({
  programModeStates: [],
  setProgramModeStates: () => {},
  tempTileGridObject: [],
  setTempTileGridObject: () => {},
});

interface IProgramModeContextProvider {
  children: ReactChild;
}

export const ProgramModeContextProvider = (
  props: IProgramModeContextProvider
) => {
  const { globalTileGridObject } = useContext(GlobalContext);
  const [programModeStates, setProgramModeStates] =
    useState<ProgramModeStatesObject>(
      getLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ) ||
        []
    );

  const [tempTileGridObject, setTempTileGridObject] =
    useState<TileGridObject>(globalTileGridObject);

  const tileGridContextValue = {
    programModeStates,
    setProgramModeStates,
    tempTileGridObject,
    setTempTileGridObject,
  };
  return (
    <ProgramModeContext.Provider value={tileGridContextValue}>
      {props.children}
    </ProgramModeContext.Provider>
  );
};
