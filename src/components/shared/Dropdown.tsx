interface DropdownProps {
  options: Array<string>;
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  return (
    <form>
      <select>
        {options.map((option) => {
          return <option>{option}</option>;
        })}
      </select>
    </form>
  );
};

export default Dropdown;
