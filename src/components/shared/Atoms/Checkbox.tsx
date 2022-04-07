import { useState } from "react";
import { CheckBoxAndLabel } from "../../Containers";

interface ICheckbox {
  label: string;
  defaultValue?: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<ICheckbox> = ({ label, defaultValue, onChange }) => {
  const [checked, setChecked] = useState<boolean>(
    defaultValue === undefined ? true : defaultValue
  );
  const handleChange = () => {
    setChecked(!checked);
    onChange(!checked);
  };
  return (
    <CheckBoxAndLabel>
      <input type={"checkbox"} checked={checked} onChange={handleChange} />
      <div>{label}</div>
    </CheckBoxAndLabel>
  );
};

export default Checkbox;
