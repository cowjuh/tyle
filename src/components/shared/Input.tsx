import { useState } from "react";
import styled from "styled-components";
import { MAX_PRESSURE_SENSOR_VALUE } from "../../utils/constants";

const InputContainer = styled.input`
  background: none;
  border: 1px solid white;
  border-radius: 3px;
  padding: 8px;
  color: white;
  max-width: 100%;
  flex: 1;
`;

interface NumericalInputProps {
  onChange: (value: number) => void;
}

const NumericalInput: React.FC<NumericalInputProps> = ({ onChange }) => {
  const [value, setValue] = useState<string>();
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
    onChange(Number(e.currentTarget.value));
  };
  return (
    <InputContainer
      type={"number"}
      min={0}
      defaultValue={0}
      max={MAX_PRESSURE_SENSOR_VALUE}
      value={value}
      onChange={handleChange}
    ></InputContainer>
  );
};

export default NumericalInput;
