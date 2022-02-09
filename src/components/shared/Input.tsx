import styled from "styled-components";
import { MAX_PRESSURE_SENSOR_VALUE } from "../../utils/constants";

const InputContainer = styled.input`
  background: none;
  border: 1px solid white;
  border-radius: 3px;
  padding: 8px;
  color: white;
`;

const NumericalInput = () => {
  return (
    <InputContainer
      type={"number"}
      min={0}
      max={MAX_PRESSURE_SENSOR_VALUE}
    ></InputContainer>
  );
};

export default NumericalInput;
