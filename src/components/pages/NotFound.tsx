import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { FullWidthHeightCenteredContainer } from "../Containers";

const NotFound = () => {
  const navigate = useNavigate();
  const onReturnHome: () => void = () => {
    navigate("/");
  };
  return (
    <FullWidthHeightCenteredContainer>
      <h2>Oops! This page does not exist.</h2>
      <Button onClick={onReturnHome}>Return home</Button>
    </FullWidthHeightCenteredContainer>
  );
};

export default NotFound;
