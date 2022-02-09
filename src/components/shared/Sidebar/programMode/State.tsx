import { useMemo, useState } from "react";
import { SidebarInnerContainer } from "../../../Containers";
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
  onSave: () => void;
}

const State: React.FC<StateProps> = ({ onSave }) => {
  const [operator, setOperator] = useState<StateOperator>(
    StateOperator.greaterThan
  );
  const [selectedColor, setSelectedColor] = useState<Color>(Color.none);
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

  return (
    <>
      <h4>When tile force is</h4>
      <Dropdown options={dropdownOptions} />
      {singleInputOperator && <NumericalInput />}
      {!singleInputOperator && <NumericalInput />}
      <h4>Set color to</h4>
      <ColorPicker onSetColor={onSetColor} />
      <Button onClick={onSave}>Save state</Button>
    </>
  );
};

export default State;
