import { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { getLocalStorageItem } from "../../../utils/helpers";
import { LocalStorageKeys } from "../../types/types";

const client = new W3CWebSocket("ws://192.168.0.41:3001");

const TempComp = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (event) => {
      setMessage(JSON.stringify(event.data));
    };
  });

  const sendMessage = () => {
    const drawModeObj = getLocalStorageItem(
      LocalStorageKeys.DRAW_MODE_TILE_GRID_LS_OBJ
    );
    client.send(JSON.stringify(drawModeObj));
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
