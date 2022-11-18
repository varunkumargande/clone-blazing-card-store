import React, { useRef } from "react";
import { addFriend } from "../../chatService";
import axios from "axios";
import { chatConstant } from "../../components/Constants";
import { modalSuccess, modalWarning } from "../intercept";
import Router from "next/router";
import { searchUsers } from "../../chatService";
import { show } from "../../store/toast/action";
import { logOut } from "../../store/auth/action";

export async function searchUser(
  setUserData,
  setUserDataLoader,
  value,
  dispatch,
  setIsOpen
) {
  setUserDataLoader(true);
  const token = localStorage.getItem("blazingToken");
  const chatHeader = {
    Authorization: `Bearer ${token}`,
  };
  const data = await axios
    .post(
      searchUsers,
      {
        slang: value,
      },
      {
        headers: chatHeader,
      }
    )
    .then((res) => {
      setUserData(res?.data?.response);
      setUserDataLoader(false);
    })
    .catch((err) => {
      dispatch(
        show({
          message: err.response?.data?.message,
          type: "error",
        })
      );
      setIsOpen(false);
      setUserDataLoader(false);
    });
}
