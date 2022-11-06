import React, { useRef } from "react";
import { addFriend } from "../../chatService";
import axios from "axios";
import { chatConstant } from "../../components/Constants/chatLocal";
import { modalSuccess, modalWarning } from "../intercept";
import Router from "next/router";
import { searchUsers } from "../../chatService";

export async function searchUser(setUserData, setUserDataLoader, value) {
  setUserDataLoader(true);
  const token = localStorage.getItem("blazingToken");
  const chatHeader = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios.post(
    searchUsers,
    {
      slang: value,
    },
    {
      headers: chatHeader,
    }
  );
  if (data.status == 200) {
    setUserData(data?.data?.response);
    setUserDataLoader(false);
  } else {
    setUserData([]);
    setUserDataLoader(false);
  }
}
