import React, { useRef } from "react";
import { addFriend } from "../../chatService";
import axios from "axios";
import { chatConstant } from "../../components/Constants/chatLocal";
import { modalSuccess, modalWarning } from "../intercept";
import Router from "next/router";

export async function addChatFrend(friendId, fetchUserData, setIsOpen, socket) {

  socket.current.emit("add-friend", {
    userId: JSON.parse(localStorage.getItem("chat-app-current-user"))?.user?._id,
    friendId: friendId,
  });

  const jsonData = {
    userId: JSON.parse(localStorage.getItem("chat-app-current-user"))?.user
      ?._id,
    friendId: friendId,
  };

  const token = sessionStorage.getItem("spurtToken");
  const chatHeader = {
    Authorization: `Bearer ${token}`,
  };
  const { data } = await axios.post(addFriend, jsonData, {
    headers: chatHeader,
  });
  if (data.success === true) {
    fetchUserData();
    setIsOpen(false);
  } else {
    alert(data?.msg);
    modalWarning("error", "error");
  }
}
