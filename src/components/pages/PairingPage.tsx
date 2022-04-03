import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Atoms/Button";
import { FullWidthHeightCenteredContainer } from "../Containers";
import { useWebSocket } from "../hooks/useWebSocket";

const PairingPage = () => {
  const navigate = useNavigate();
  const [isPairing, setIsPairing] = useState<boolean>(false);
  const [isPaired, setIsPaired] = useState<boolean>(true);
  const { syncTileGrid } = useWebSocket();
  const failedToPair = useMemo<boolean>(
    () => !isPairing && !isPaired,
    [isPairing, isPaired]
  );
  const pairedSuccessfully = useMemo<boolean>(
    () => !isPairing && isPaired,
    [isPairing, isPaired]
  );

  const attemptToPair: () => void = () => {
    syncTileGrid();
  };

  // TODO: make this work lol
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
