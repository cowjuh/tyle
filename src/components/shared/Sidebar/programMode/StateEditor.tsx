import { useMemo, useState } from "react";
import { generateStateId } from "../../../../utils/helpers";
import { Color, StateOperator } from "../../../types/types";
import Button from "../../Button";
import ColorPicker from "../../ColorPicker/ColorPicker";
import Dropdown from "../../Dropdown";
import NumericalInput from "../../Input";

const dropdownOptions = [
  StateOperator.greaterThan,
  StateOperator.lessThan,
  StateOperator.equalTo,
  StateOperator.notEqualTo,
  StateOperator.between,
];

interface StateProps {
  id?: string;
  onSave: (
    id: string,
    color: Color,
    operator: StateOperator,
    input1: number,
    input2?: number | undefined
  ) => void;
}

const StateEditor: React.FC<StateProps> = ({ onSave, id }) => {
  const [operator, setOperator] = useState<StateOperator>(
    StateOperator.greaterThan
  );
  const [selectedColor, setSelectedColor] = useState<Color>(Color.none);
  const [input1, setInput1] = useState<number>(0);
  const [input2, setInput2] = useState<number>(0);
  const singleInputOperator = useMemo(
    () => operator != StateOperator.between,
    [operator]
  );

  const onSetColor = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: Color
  ) => {
    console.log(color);
    setSelectedColor(color);
  };

  // TODO: This currently uses the date as an ID which is NON IDEAL!!
  const handleOnSave = () => {
    onSave(id || generateStateId(), selectedColor, operator, input1, input2);
  };

  return (
    <>
      <h4>When tile force is</h4>
      <Dropdown options={dropdownOptions} />
      {singleInputOperator && <NumericalInput />}
      {!singleInputOperator && <NumericalInput />}
      <h4>Set color to</h4>
      <ColorPicker onSetColor={onSetColor} />
      <Button onClick={handleOnSave}>
        {id ? "Save state" : "Create state"}
      </Button>
    </>
  );
};

export default StateEditor;
