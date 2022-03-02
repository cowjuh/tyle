import { useState } from "react";
import styled from "styled-components";
import { StateOperator } from "../types/types";

interface DropdownProps {
  options: Array<string>;
  onChange: (val: string) => void;
}

const DropdownStyled = styled.select`
  background: #ffffff20;
  color: white;
  padding: 5px;
  width: 100%;
  border-radius: 5px;
`;

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  const [value, setValue] = useState<string>(StateOperator.greaterThan);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
    onChange(e.currentTarget.value);
  };
  return (
    <form>
      <DropdownStyled value={value} onChange={handleChange}>
        {options.map((option) => {
          return <option>{option}</option>;
        })}
      </DropdownStyled>
    </form>
  );
};

export default Dropdown;
