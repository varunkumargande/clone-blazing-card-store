import { useEffect, useState } from "react";

// This hook will let you know whether use logged in
export default function useChatUser() {
  const [chatUser, setChatUser] = useState(null);
  const [isChatUser, setIsChatUser] = useState(false);

  useEffect(() => {
    console.log(!!localStorage.getItem("chat-app-current-user"));
    if (!!localStorage.getItem("chat-app-current-user")) {
      setChatUser();
    } else {
      setIsChatUser(true);
    }
  }, [isChatUser]);

  return {
    chatUser,
  };
}
