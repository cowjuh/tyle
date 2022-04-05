import { ReactChild, useEffect } from "react";
import { WebSocketProvider } from "./context/webSocketContext";
import { useWebSocket } from "./hooks/useWebSocket";

interface IWebSocketHLC {
  children: ReactChild;
}

const WebSocketHLC = (props: IWebSocketHLC) => {
  const { socket, onMessage } = useWebSocket();
  useEffect(() => {
    if (socket.readyState === WebSocket.CLOSED) {
    } else {
      socket.onopen = () => {
        console.log("WebSocket Client Connected");
      };
      socket.onerror = () => {
        console.log("onerror");
      };
      socket.onclose = () => {
        console.log("onclose");
      };
      onMessage();
    }
  });

  return <WebSocketProvider>{props.children}</WebSocketProvider>;
};

export default WebSocketHLC;
