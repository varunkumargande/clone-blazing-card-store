import React, { useState } from "react";

function getChatCurrentUser(keyName) {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const currentUser = JSON.parse(window.localStorage?.getItem(keyName));
    return currentUser;
  }
}

export const useChatCurrentUser = () => {
  const [currentUserData, setCurrentUserData] = useState(() => {
    return getChatCurrentUser("chat-app-current-user");
  });
  return [currentUserData];
};
