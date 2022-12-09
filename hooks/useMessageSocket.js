import { io } from "socket.io-client";
import { host } from "../chatService";
import { useEffect, useState, useRef } from "react";

export const useMessageSocket = () => {
  const socket = useRef();
  const [socketData, setSocketData] = useState(null);
  useEffect(() => {
    socket.current = io(host);
    setSocketData(socket.current);
  }, []);
  return [socketData];
};
