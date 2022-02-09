import { useContext } from "react";
import { constructStateObject } from "../../utils/helpers";
import { ProgramModeContext } from "../context/programModeContext";
import { Color, ProgramModeStateObject, StateOperator } from "../types/types";

export const useProgramModeContext = () => {
  const { programModeStates, setProgramModeStates } =
    useContext(ProgramModeContext);
  const updateProgramModeStates = (
    color: Color,
    operator: StateOperator,
    input1: number,
    input2?: number
  ) => {
    const newStateObject: ProgramModeStateObject = constructStateObject(
      color,
      operator,
      input1,
      input2
    );
    setProgramModeStates([...programModeStates, newStateObject]);
  };
  Array.from(document.querySelectorAll(".led")).forEach((el) =>
    el.classList.remove("selected")
  );
  return [updateProgramModeStates];
};
