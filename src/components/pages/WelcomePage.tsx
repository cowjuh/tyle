import Button from "../shared/Atoms/Button";
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
      <img src={tyleLogo} alt="Tyle Logo" />
      <h2>Welcome to Tyle</h2>
      <Button onClick={onReadyToPair}>Pair my device</Button>
    </FullWidthHeightCenteredContainer>
  );
};

export default WelcomePage;
