import { useState } from "react";
import styled from "styled-components";
import { MAX_PRESSURE_SENSOR_VALUE } from "../../../utils/constants";

const InputContainer = styled.input`
  background: #ffffff10;
  border: 1px solid #ffffff50;
  border-radius: 3px;
  padding: 5px;
  color: white;
  width: 30px;
`;

const LetterInputContainer = styled(InputContainer)`
  text-transform: uppercase;
`;

const LETTER_INPUT_PATTERN = "[ABCDEFGHIJKLMNOPQRSTUVWXYZ]";

interface NumericalInputProps {
  initialValue?: number;
  maxLength?: number;
  onChange: (value: number) => void;
}

interface LetterInputProps {
  initialValue?: string;
  onChange: (value: string) => void;
}

export const NumericalInput: React.FC<NumericalInputProps> = ({
  onChange,
  initialValue,
  maxLength,
}) => {
  const [value, setValue] = useState<number>(initialValue || 0);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(Number(e.currentTarget.value));
    onChange(Number(e.currentTarget.value));
  };
  return (
    <InputContainer
      min={0}
      maxLength={maxLength}
      defaultValue={value}
      max={MAX_PRESSURE_SENSOR_VALUE}
      onChange={handleChange}
    />
  );
};

export const LetterInput: React.FC<LetterInputProps> = ({
  onChange,
  initialValue,
}) => {
  const [value, setValue] = useState<string>(initialValue || "");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    // const cleanedValue = e.currentTarget.value.replace(/[^A-Za-z]/gi, "");
    // setValue(cleanedValue);
    // onChange(cleanedValue);
    setValue(e.currentTarget.value);
    onChange(e.currentTarget.value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const re = /[a-zA-Z]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <form>
      <LetterInputContainer
        type="text"
        maxLength={1}
        defaultValue={value}
        onChange={handleChange}
        onKeyPress={onKeyPress}
      />
    </form>
  );
};
