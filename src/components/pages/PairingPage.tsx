import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
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

  const attemptToPair: () => void = () => {
    // TODO Specify the right library for this and actually set up pairing alg.
  };

  useEffect(() => {
    attemptToPair();
  }, []);

  const onReturnHome = () => {
    navigate("/");
  };

  const onTryAgain = () => {};

  const onGoToPlayground = () => {
    navigate("/playground/data");
  };

  return (
    <FullWidthHeightCenteredContainer>
      {isPairing && (
        <>
          <h2>Pairing device...</h2>
        </>
      )}
      {failedToPair && (
        <>
          <h2>Failed to pair</h2>
          <div>
            <Button onClick={onReturnHome}>Return home</Button>
            <Button onClick={onTryAgain}>Try again</Button>
          </div>
        </>
      )}
      {pairedSuccessfully && (
        <>
          <h2>Device paired successfully!</h2>
          <Button onClick={onGoToPlayground}>Go to playground</Button>
        </>
      )}
    </FullWidthHeightCenteredContainer>
  );
};

export default PairingPage;
