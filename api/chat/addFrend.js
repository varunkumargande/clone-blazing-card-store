import React, { useRef } from "react";
import { addFriend } from "../../chatService";
import axios from "axios";
import { chatConstant } from "../../components/Constants";
import { modalSuccess, modalWarning } from "../intercept";
import Router from "next/router";
import { show } from "../../store/toast/action";
import { logOut } from "../../store/auth/action";

export async function addChatFrend(
  friendId,
  fetchUserData,
  setIsOpen,
  socket,
  dispatch
) {
  socket.current.emit("add-friend", {
    userId: JSON.parse(localStorage.getItem("chat-app-current-user"))?._id,
    friendId: friendId,
  });

  const jsonData = {
    userId: JSON.parse(localStorage.getItem("chat-app-current-user"))?._id,
    friendId: friendId,
  };

  const token = localStorage.getItem("blazingToken");
  const chatHeader = {
    Authorization: `Bearer ${token}`,
  };
  await axios
    .post(addFriend, jsonData, {
      headers: chatHeader,
    })
    .then((res) => {
      fetchUserData();
      setIsOpen(false);
    })
    .catch((err) => {
      dispatch(
        show({
          message: err.response?.data?.message,
          type: "error",
        })
      );
      setIsOpen(false);
    });
}
