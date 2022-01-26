import styled from "styled-components";

interface LEDProps {
  parentKey: string;
  key: string;
}

const LEDContainer = styled.div<LEDProps>`
  border-radius: 100%;
  background: #ffffff40;
`;

const LED: React.FC<LEDProps> = ({ parentKey, key }) => {
  return <LEDContainer parentKey={parentKey} key={key} />;
};

export default LED;
