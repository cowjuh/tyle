import { ReactChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../../context/globalContext";
import { PlaygroundMode, PlaygroundModeEnum } from "../../types/types";

interface ClickableTextProps {
  onClick: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  children: string;
  id: PlaygroundMode;
  selected: boolean;
}

const ClickableText = styled.button<ClickableTextProps>`
  font-weight: 800;
  font-size: 16px;
  border: none;
  padding: 0;
  background: none;
  color: ${(p) => (p.selected ? "#ffffff" : "#ffffff70")};
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
  const { setPlaygroundMode, playgroundMode } = useContext(GlobalContext);

  const onNavigate = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    setPlaygroundMode(
      PlaygroundModeEnum[e.currentTarget.id as keyof typeof PlaygroundModeEnum]
    );
    navigate(`/playground/${e.currentTarget.id}`);
  };

  return (
    <TabsContainer>
      <ClickableText
        onClick={onNavigate}
        id={PlaygroundModeEnum.data}
        selected={playgroundMode === PlaygroundModeEnum.data}
      >
        Data
      </ClickableText>
      <ClickableText
        onClick={onNavigate}
        id={PlaygroundModeEnum.draw}
        selected={playgroundMode === PlaygroundModeEnum.draw}
      >
        Draw
      </ClickableText>
      <ClickableText
        onClick={onNavigate}
        id={PlaygroundModeEnum.program}
        selected={playgroundMode === PlaygroundModeEnum.program}
      >
        Program
      </ClickableText>
    </TabsContainer>
  );
};

export default Tabs;
