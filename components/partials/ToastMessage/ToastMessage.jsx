import React from "react";
import IconSuccessCheck from "../../Icons/IconSuccessCheck";
import IconError from "../../Icons/IconError";
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
      <div className="toast-message flex flex-center">
        {data?.type === 'success' ? <IconSuccessCheck /> : <IconError />} {data?.message}
      </div>
      <button className="close ml-3" onClick={handleClose}>
        <IconClose />
      </button>
    </div>
  );
}
