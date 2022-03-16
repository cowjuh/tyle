import { useContext } from "react";
import {
  constructStateObject,
  generateStateId,
  setLocalStorageItem,
} from "../../utils/helpers";
import { ProgramModeContext } from "../context/programModeContext";
import {
  Color,
  LocalStorageKeys,
  ProgramModeStateObject,
  ProgramModeStatesObject,
  StateOperator,
} from "../types/types";

export const useProgramModeContext = () => {
  const { programModeStates, setProgramModeStates } =
    useContext(ProgramModeContext);

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
    color: Color,
    operator: StateOperator,
    input1: number,
    input2?: number
  ) => {
    const newStateObject: ProgramModeStateObject = constructStateObject(
      id,
      color,
      operator,
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
    Array.from(document.querySelectorAll(".led")).forEach((el) =>
      el.classList.remove("selected")
    );
  };

  /**
   * Creates a new Program Mode State
   * @param color
   * @param operator
   * @param input1
   * @param input2
   */
  const createProgramModeState = (
    color: Color,
    operator: StateOperator,
    input1: number,
    input2?: number
  ) => {
    const id = generateStateId();
    const newStateObject: ProgramModeStateObject = constructStateObject(
      id,
      color,
      operator,
      input1,
      input2
    );
    setProgramModeStates([...programModeStates, newStateObject]);
    setLocalStorageItem(LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ, [
      ...programModeStates,
      newStateObject,
    ]);
    Array.from(document.querySelectorAll(".led")).forEach((el) =>
      el.classList.remove("selected")
    );
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
      if (programModeStates[i].id === id) deepCopyProgramModeStates.splice(i);
    }

    setProgramModeStates(deepCopyProgramModeStates);
    setLocalStorageItem(
      LocalStorageKeys.PROGRAM_MODE_STATES_LIST_LS_OBJ,
      deepCopyProgramModeStates
    );
  };

  return {
    updateProgramModeStates,
    createProgramModeState,
    getStateObjectById,
    deleteStateObjectById,
  };
};
