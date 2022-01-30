import { ReactChildren } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PlaygroundMode } from "../../types/types";

interface ClickableTextProps {
  onClick: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  children: string;
  id: PlaygroundMode;
}

const ClickableText = styled.button<ClickableTextProps>`
  font-weight: 800;
  font-size: 16px;
  border: none;
  padding: 0;
  background: none;
  color: #ffffff70;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    color: white;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
