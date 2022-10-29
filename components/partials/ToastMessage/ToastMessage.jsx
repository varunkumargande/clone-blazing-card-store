import React from "react";
import IconWhitecheck from "../../Icons/IconWhitecheck";
import IconWhiteError from "../../Icons/IconWhiteError";
import IconClose from "../../Icons/IconClose";
import { hide } from "../../../store/toast/action";
import { useDispatch } from "react-redux";
export function TostMessage({ data }) {
  const dispatch = useDispatch();
  function handleClose() {
    dispatch(hide());
  }
  setTimeout(handleClose, 5000);
  return (
    <div
      className={`ToastMessageWrapper flex space-between flex-center ${data?.type}`}
    >
      <div className="toast-massage flex flex-center">
        <IconWhitecheck /> {data?.message}
      </div>
      <button className="close" onClick={handleClose}>
        <IconClose />
      </button>
    </div>
  );
}
