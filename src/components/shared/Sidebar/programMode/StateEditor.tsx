import { useMemo, useState } from "react";
import styled from "styled-components";
import { Color, StateOperator } from "../../../types/types";
import Button from "../../Atoms/Button";
import ColorPicker from "../../ColorPicker/ColorPicker";
import Dropdown from "../../Atoms/Dropdown";
import { TextButton } from "../../Atoms/TextButton";
import {
  SidebarHorizContainer,
  SidebarInnerContainer,
} from "../../../Containers";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BASE_ROUTE_PROGRAM_MODE,
  DROPDOWN_OPTIONS,
} from "../../../../utils/constants";
import { getStateId } from "../../../../utils/helpers";
import { useProgramModeContext } from "../../../hooks/useProgramModeContext";
import { LetterInput, NumericalInput } from "../../Atoms/Input";

const BetweenOperatorInputContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
`;

const BetweenOperatorSupportText = styled.div`
  padding: 0;
`;

const TileIdInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: fit-content;
  gap: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StateEditor = () => {
  const location = useLocation();
  const stateId = getStateId(location.pathname); // undefined if no existing stateId exists
  const navigate = useNavigate();

  const {
    updateProgramModeStates,
    createProgramModeState,
    getStateObjectById,
    deleteStateObjectById,
  } = useProgramModeContext();

  const stateObject = stateId ? getStateObjectById(stateId) : undefined;
  const [selectedColor, setSelectedColor] = useState<Color>(
    (stateObject && stateObject?.color) || Color.none
  );
  const [input1, setInput1] = useState<number>(
    (stateObject && stateObject?.primaryInputValue) || 0
  );
  const [input2, setInput2] = useState<number>(
    (stateObject && stateObject?.secondaryInputValue) || 0
  );
  const [operator, setOperator] = useState<StateOperator>(
    (stateObject && stateObject?.operator) || StateOperator.greaterThan
  );

  const [tileId, setTileId] = useState();

  const isSingleInputOperator = useMemo(
    () => operator !== StateOperator.between,
    [operator]
  );

  const isCreatingNewState = useMemo(() => {
    return stateId === undefined;
  }, [stateId]);

  const onSetColor = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    color: Color
  ) => {
    e.preventDefault();
    setSelectedColor(color);
  };

  const handleOnCreate = () => {
    createProgramModeState(selectedColor, operator, input1, input2);
    navigate(BASE_ROUTE_PROGRAM_MODE);
  };

  const handleOnSave = () => {
    if (stateId) {
      updateProgramModeStates(stateId, selectedColor, operator, input1, input2);
      navigate(BASE_ROUTE_PROGRAM_MODE);
    }
  };

  const handleOnDelete = () => {
    stateId && deleteStateObjectById(stateId);
    navigate(BASE_ROUTE_PROGRAM_MODE);
  };

  const onDropdownChange = (operator: string) => {
    setOperator(StateOperator[operator as keyof typeof StateOperator]);
  };

  const onInput1Change = (val: number) => setInput1(val);

  const onInput2Change = (val: number) => setInput2(val);

  const onBack = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(BASE_ROUTE_PROGRAM_MODE);
  };

  return (
    <>
      <SidebarHorizContainer>
        <TextButton onClick={onBack}>{`← Back`}</TextButton>
      </SidebarHorizContainer>
      <SidebarInnerContainer>
        <h4>Tile</h4>
        <TileIdInputContainer>
          <LetterInput onChange={() => {}} />
          <NumericalInput onChange={() => {}} maxLength={1} />
        </TileIdInputContainer>
        <h4>Operator</h4>
        <Dropdown
          options={DROPDOWN_OPTIONS}
          onChange={onDropdownChange}
          initialValue={operator}
        />
        <h4>Value{!isSingleInputOperator && "s"}</h4>
        <BetweenOperatorInputContainer>
          {isSingleInputOperator && (
            <>
              <NumericalInput
                onChange={onInput1Change}
                initialValue={input1}
                maxLength={3}
              />
            </>
          )}
          {!isSingleInputOperator && (
            <>
              <NumericalInput
                onChange={onInput1Change}
                initialValue={input1}
                maxLength={3}
              />
              <BetweenOperatorSupportText>and</BetweenOperatorSupportText>
              <NumericalInput
                onChange={onInput2Change}
                initialValue={input2}
                maxLength={3}
              />
            </>
          )}
          <div>N</div>
        </BetweenOperatorInputContainer>
        <h4>Color</h4>
        <ColorPicker onSetColor={onSetColor} />
        <ButtonContainer>
          <Button onClick={isCreatingNewState ? handleOnCreate : handleOnSave}>
            {isCreatingNewState ? "Create state" : "Save State"}
          </Button>
          <TextButton onClick={onBack}>Cancel</TextButton>
          {!isCreatingNewState && (
            <TextButton onClick={handleOnDelete}>Delete</TextButton>
          )}
        </ButtonContainer>
      </SidebarInnerContainer>
    </>
  );
};

export default StateEditor;
