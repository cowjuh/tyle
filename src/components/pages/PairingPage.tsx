import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import { FullWidthHeightCenteredContainer } from "../Containers";

const PairingPage = () => {
  const navigate = useNavigate();
  const [isPairing, setIsPairing] = useState<boolean>(false);
  const [isPaired, setIsPaired] = useState<boolean>(true);
  const failedToPair = useMemo<boolean>(
    () => !isPairing && !isPaired,
    [isPairing, isPaired]
  );
  const pairedSuccessfully = useMemo<boolean>(
    () => !isPairing && isPaired,
    [isPairing, isPaired]
  );

  const onPairAttempt = () => {};

  const onReturnHome = () => {
    navigate("/");
  };

  const onTryAgain = () => {};

  const onGoToPlayground = () => {
    navigate("/playground");
  };

  return (
    <FullWidthHeightCenteredContainer>
      {isPairing && (
        <div>
          <h2>Pairing device...</h2>
        </div>
      )}
      {failedToPair && (
        <div>
          <h2>Failed to pair</h2>
          <div>
            <Button onClick={onReturnHome}>Return home</Button>
            <Button onClick={onTryAgain}>Try again</Button>
          </div>
        </div>
      )}
      {pairedSuccessfully && (
        <div>
          <h2>Device paired successfully!</h2>
          <Button onClick={onGoToPlayground}>Go to playground</Button>
        </div>
      )}
    </FullWidthHeightCenteredContainer>
  );
};

export default PairingPage;
