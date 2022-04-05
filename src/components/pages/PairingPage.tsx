import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Atoms/Button";
import {
  FullWidthHeightCenteredContainer,
  HorizButtonContainer,
} from "../Containers";
import { useWebSocket } from "../hooks/useWebSocket";
import { GlobalContext } from "../context/globalContext";

const PairingPage = () => {
  const navigate = useNavigate();
  const [isPairing, setIsPairing] = useState<boolean>(false);
  const [isPaired, setIsPaired] = useState<boolean>(true);
  const { syncTileGrid } = useWebSocket();
  const { globalTileGridObject } = useContext(GlobalContext);
  const failedToPair = useMemo<boolean>(
    () => !isPairing && !isPaired,
    [isPairing, isPaired]
  );
  const pairedSuccessfully = useMemo<boolean>(
    () => !isPairing && isPaired,
    [isPairing, isPaired]
  );

  const tryPairing = () => {
    setIsPairing(true);
    try {
      syncTileGrid();
      setIsPairing(false);
      setIsPaired(true);
    } catch (error) {
      setIsPairing(false);
      setIsPaired(false);
    }
  };

  useEffect(() => {
    tryPairing();
  }, []);

  const onReturnHome = () => {
    navigate("/");
  };

  const onTryAgain = () => {
    tryPairing();
  };

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
          <HorizButtonContainer>
            <Button onClick={onReturnHome}>Return home</Button>
            <Button onClick={onTryAgain}>Try again</Button>
          </HorizButtonContainer>
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
