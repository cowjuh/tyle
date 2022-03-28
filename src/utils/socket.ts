import { io } from "socket.io-client";

export const espSocket = io("/");

export const socketSendMessage = (msg: string) => {
  console.log("Trying to send message here");
  espSocket.emit("send_message", { msg });
};

export const socketReceiveMesage = () => {
  espSocket.on("receive_message", (data) => {
    console.log(data.message);
  });
};
