import { ReactChildren } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ClickableTextProps {
  onClick: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  children: string;
  id: "data" | "draw" | "program";
}

const ClickableText = styled.button<ClickableTextProps>`
  font-weight: 800;
  border: none;
  padding: 0;
  background: none;
  color: white;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: start;
`;

const Tabs = () => {
  const navigate = useNavigate();

  const onNavigate = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    navigate(`/playground/${e.currentTarget.id}`);
  };

  return (
    <TabsContainer>
      <ClickableText onClick={onNavigate} id="data">
        Data
      </ClickableText>
      <ClickableText onClick={onNavigate} id="draw">
        Draw
      </ClickableText>
      <ClickableText onClick={onNavigate} id="program">
        Program
      </ClickableText>
    </TabsContainer>
  );
};

export default Tabs;
