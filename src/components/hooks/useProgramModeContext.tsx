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
  StateOperator,
} from "../types/types";

export const useProgramModeContext = () => {
  const { programModeStates, setProgramModeStates } =
    useContext(ProgramModeContext);

  // UPDATE PROGRAM MODE STATES
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
    console.log(newStateObject);
    setProgramModeStates([...programModeStates, newStateObject]);

    Array.from(document.querySelectorAll(".led")).forEach((el) =>
      el.classList.remove("selected")
    );
  };

  // CREATE NEW PROGRAM MODE STATE
  // Generates an ID for the state object
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
  return { updateProgramModeStates, createProgramModeState };
};
