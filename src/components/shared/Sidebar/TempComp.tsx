import { useContext, useEffect, useState } from "react";
import { setLocalStorageItem } from "../../../utils/helpers";
import { GlobalContext } from "../../context/globalContext";
import { WebSocketContext } from "../../context/webSocketContext";
import { useWebSocket } from "../../hooks/useWebSocket";

const TempComp = () => {
  const [message, setMessage] = useState("");
  const { setGlobalTileGridObject } = useContext(GlobalContext);
  const { socket, onMessage } = useWebSocket();
  useEffect(() => {
    socket.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    socket.onmessage = (event) => {
      setMessage(JSON.stringify(event.data));
      setMessage(JSON.parse(JSON.stringify(event.data)));
      var msgReturn = onMessage(event);
      /**
       * TODO: There are multiple type possibilites if onMessage
       * decides to return things other than the tile grid object
       */
      if (msgReturn !== undefined) {
        setGlobalTileGridObject(msgReturn);
      }
    };
  });
  return <div></div>;
};

export default TempComp;
