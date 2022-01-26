import Button from "../shared/Button";
import { useNavigate } from "react-router-dom";
import { FullWidthHeightCenteredContainer } from "../Containers";
import tyleLogo from "../../tyle_logo.svg";

const WelcomePage = () => {
  const navigate = useNavigate();
  const onReadyToPair: () => void = () => {
    navigate("/pairing");
  };
  return (
    <FullWidthHeightCenteredContainer>
      <img src={tyleLogo} />
      <h2>Welcome to Tyle</h2>
      <Button onClick={onReadyToPair}>Pair my device</Button>
    </FullWidthHeightCenteredContainer>
  );
};

export default WelcomePage;
