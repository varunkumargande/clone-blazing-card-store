import { useEffect, useState } from "react";

// This hook will let you know whether use logged in
export default function useChatUser() {
  const [chatUser, setChatUser] = useState({});

  useEffect(() => {
    if (!!localStorage.getItem("chat-app-current-user")) {
      setChatUser(JSON.parse(localStorage.getItem("chat-app-current-user")));
    }
  }, [typeof window]);

  return {
    chatUser,
  };
}
