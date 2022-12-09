import { io } from "socket.io-client";
import { host } from "../chatService";
import { useEffect, useState, useRef } from "react";
import { useChatCurrentUser } from "../hooks/useChatCurrentUser";

// function emitSocket(socket) {
//   const [currentUserData] = useChatCurrentUser();
//   if (!!currentUserData) {
//     socket.current = io(host);
//     // socket.current.emit("add-user", currentUserData?._id);
//     return socket.current;
//   }
// }

export const useMessageSocket = () => {
  const socket = useRef();
  socket.current = io(host);
  const [socketData, setSocketData] = useState(null);
  useEffect(() => {
    setSocketData(socket.current);
  }, []);
  return [socketData];
};
