import { useContext } from "react";
import {
  constructStateObject,
  generateStateId,
  getUpdatedTileGridObject,
  setLocalStorageItem,
} from "../../utils/helpers";
import { ProgramModeContext } from "../context/programModeContext";
import {
  Color,
  LocalStorageKeys,
  ProgramModeStateObject,
  ProgramModeStatesObject,
  StateOperator,
  TileGridObject,
  TileIdObject,
} from "../../utils/types";
import { GlobalContext } from "../context/globalContext";

export const useProgramModeContext = () => {
  const {
    programModeStates,
    setProgramModeStates,
    tempTileGridObject,
    setTempTileGridObject,
  } = useContext(ProgramModeContext);
  const { selectoRef } = useContext(GlobalContext);

  // INTERNAL UTILITY FUNCTIONS
  const clearTempTileGridObject = () => {
    setTempTileGridObject([]);
  };

  /**
   * Updates an existing State Object by ID
   * @param id
   * @param color
   * @param operator
   * @param input1
   * @param input2
   */
  const updateProgramModeStates = (
    id: string,
    tileId: TileIdObject,
    color: Color,
    operator: StateOperator,
    input1: number,
    input2?: number
  ) => {
    const newStateObject: ProgramModeStateObject = constructStateObject(
      id,
      tileId,
      color,
      operator,
      tempTileGridObject,
      input1,
      input2
    );
    var deepCopyProgramModeStates: ProgramModeStatesObject = JSON.parse(
      JSON.stringify(programModeStates)
    );
    for (let i = 0; i < deepCopyProgramModeStates.length; i++) {
      if (deepCopyProgramModeStates[i].id === id) {
        deepCopyProgramModeStates[i] = newStateObject;
      }
    }
    setProgramModeStates(deepCopyProgramModeStates);
    setLocalStorageItem(
      LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ,
      deepCopyProgramModeStates
    );
    selectoRef?.current?.setSelectedTargets([]);

    clearTempTileGridObject();
  };

  /**
   * Creates a new Program Mode State
   * @param tileId
   * @param color
   * @param operator
   * @param tileGridObject
   * @param input1
   * @param input2
   */
  const createProgramModeState = (
    tileId: TileIdObject,
    color: Color,
    operator: StateOperator,
    input1: number,
    input2?: number
  ) => {
    const id = generateStateId();
    const newStateObject: ProgramModeStateObject = constructStateObject(
      id,
      tileId,
      color,
      operator,
      tempTileGridObject,
      input1,
      input2
    );
    setProgramModeStates([...programModeStates, newStateObject]);
    setLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ, [
      ...programModeStates,
      newStateObject,
    ]);
    clearTempTileGridObject();
    selectoRef?.current?.setSelectedTargets([]);
  };

  /**
   * Gets a state object by its ID
   * @param id
   * @returns
   */
  const getStateObjectById = (
    id: string
  ): ProgramModeStateObject | undefined => {
    for (let i = 0; i < programModeStates.length; i++) {
      if (programModeStates[i].id === id) return programModeStates[i];
    }
  };

  const deleteStateObjectById = (id: string): void => {
    var deepCopyProgramModeStates: ProgramModeStatesObject = JSON.parse(
      JSON.stringify(programModeStates)
    );
    for (let i = 0; i < programModeStates.length; i++) {
      if (programModeStates[i].id === id)
        deepCopyProgramModeStates.splice(i, 1);
    }
    setProgramModeStates(deepCopyProgramModeStates);
    setLocalStorageItem(
      LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ,
      deepCopyProgramModeStates
    );
    clearTempTileGridObject();
  };

  /**
   * UPDATING AND CLEARING TEMPTILEGRID OBJECT
   * This object is used in the context to store an updated version
   * of a state's tileGridObject.
   * When the user hits save, this temp object overwrites
   * the state's existing tileGridObject.
   * Otherwise, it gets cleared each time we exit the StateEditor view
   */

  const updateTempTileGridObject = (color: Color) => {
    let updatedTileGridObject = getUpdatedTileGridObject(
      color,
      tempTileGridObject
    );
    console.log(updatedTileGridObject);
    setTempTileGridObject(updatedTileGridObject);
    selectoRef?.current?.setSelectedTargets([]);
  };

  const initializeTempTileGridObject = (tileGridObject: TileGridObject) => {
    setTempTileGridObject(tileGridObject);
  };

  const clearProgramModeContext = () => {
    setProgramModeStates([]);
  };
  return {
    updateProgramModeStates,
    createProgramModeState,
    getStateObjectById,
    deleteStateObjectById,
    updateTempTileGridObject,
    initializeTempTileGridObject,
    clearProgramModeContext,
  };
};
