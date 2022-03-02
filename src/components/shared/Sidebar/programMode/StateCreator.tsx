import { useMemo, useState } from "react";
import styled from "styled-components";
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

const BetweenOperatorInputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const BetweenOperatorSupportText = styled.div`
  padding: 0 8px;
`;

interface StateProps {
  onCreate: (
    color: Color,
    operator: StateOperator,
    input1: number,
    input2?: number | undefined
  ) => void;
}

const StateCreator: React.FC<StateProps> = ({ onCreate }) => {
  const [operator, setOperator] = useState<StateOperator>(
    StateOperator.greaterThan
  );
  const [selectedColor, setSelectedColor] = useState<Color>(Color.none);
  const [input1, setInput1] = useState<number>(0);
  const [input2, setInput2] = useState<number>(0);
  const isSingleInputOperator = useMemo(
    () => operator != StateOperator.between,
    [operator]
  );

  const onSetColor = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: Color
  ) => {
    setSelectedColor(color);
  };

  const handleOnCreate = () => {
    onCreate(selectedColor, operator, input1, input2);
  };

  const onDropdownChange = (operator: string) => {
    setOperator(StateOperator[operator as keyof typeof StateOperator]);
  };

  const onInput1Change = (val: number) => setInput1(val);

  const onInput2Change = (val: number) => setInput2(val);

  return (
    <>
      <h4>When tile force is</h4>
      <Dropdown options={dropdownOptions} onChange={onDropdownChange} />
      {isSingleInputOperator && <NumericalInput onChange={onInput1Change} />}
      {!isSingleInputOperator && (
        <BetweenOperatorInputContainer>
          <NumericalInput onChange={onInput1Change} />
          <BetweenOperatorSupportText>and</BetweenOperatorSupportText>
          <NumericalInput onChange={onInput2Change} />
        </BetweenOperatorInputContainer>
      )}
      <h4>Set color to</h4>
      <ColorPicker onSetColor={onSetColor} />
      <Button onClick={handleOnCreate}>Create state</Button>
      <span>Cancel</span>
    </>
  );
};

export default StateCreator;
