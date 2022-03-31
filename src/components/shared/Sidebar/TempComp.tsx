import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { getLocalStorageItem } from "../../../utils/helpers";
import { wsClient } from "../../../utils/socket";
import { LocalStorageKeys } from "../../types/types";

const TempComp = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    wsClient.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    wsClient.onmessage = (event) => {
      setMessage(JSON.stringify(event.data));
      console.log(event.data);
    };
  });

  const sendMessage = () => {
    const drawModeObj = getLocalStorageItem(
      LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ
    );
    // client.send(JSON.stringify(drawModeObj));
    wsClient.send("rgba");
  };
  return (
    <div>
      <div>{message}</div>
      <button className="Button" onClick={() => sendMessage()}>
        Send Message
      </button>
    </div>
  );
};

export default TempComp;
