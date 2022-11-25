import React, { useRef, useEffect } from "react";
import IconChat from "../../Icons/IconChat";
import Router from "next/router";
import moment from "moment";
import { DefaultImagePath } from "../../Constants/imageConstants";
import Styles from "../../../modular_scss/message.module.scss";

export default function ChatPannel({
  messages,
  contactDetail,
  setMsg,
  msg,
  handleSendMsg,
  setIsOpen,
}) {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current != null) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const handleEnterPressEvent = (event) => {
    if (event.key == "Enter") {
      sendChat(event);
    }
  };

  /**
   * this function is using for going to profile information page
   */

  const navigateToProfileInfo = (userId) => {
    Router.push(`/profile?userId=${userId}`);
  };

  return (
    <>
      {!!contactDetail ? (
        <>
          <div className="right-pannel">
            <div className="profile-header-title flex flex-center">
              <div
                class="chat-title flex flex-center justify-start pointer"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToProfileInfo(contactDetail?.userId);
                }}
              >
                <div className={`image ${Styles.images}`}>
                  <img
                    src={
                      contactDetail?.avatarImage == ""
                        ? DefaultImagePath.defaultProfileImage
                        : `${process.env.NEXT_PUBLIC_CLOUD_IMAGE_URL}${process.env.NEXT_PUBLIC_CHAT_PROFILE_IMAGE_SIZE}${contactDetail.avatarImage}`
                    }
                    width="40"
                    height="40"
                    alt=""
                  />
                </div>
                <div className="profile-text">
                  <div className="name">
                    {contactDetail?.firstName} {contactDetail?.lastName}{" "}
                    <span className="new"></span>
                  </div>
                  <div className="time">@{contactDetail?.username}</div>
                </div>
              </div>
            </div>
            <div className="chat-box-wrap">
              <div className="chat-box flex justify-right column">
                {messages?.map((item, index) => {
                  if (item.fromSelf) {
                    return (
                      <>
                        <div
                          className="chat-wrap right"
                          key={`${item.time}-chat-panel-sender`}
                        >
                          <div className="chat">{item?.message}</div>
                          <div className="time">
                            {item?.time &&
                              moment(new Date(item?.time)).format("HH:mm")}
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div
                          className="chat-wrap left"
                          key={`${item.time}-chat-panel-receiver`}
                        >
                          <div className="chat">{item?.message}</div>
                          <div className="time">{item?.time}</div>
                        </div>
                      </>
                    );
                  }
                })}
                <div ref={divRef} />
              </div>
            </div>
            <div className="input-chat flex space-between flex-center">
              <input
                value={msg}
                type="text"
                placeholder="Start conversation..."
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(event) => handleEnterPressEvent(event)}
              />
              {/* <button className="g-btn">
                <IconGallery />
              </button> */}
              <button
                className="chat-btn flex flex-center justify-center br50"
                onClick={(event) => sendChat(event)}
                onKeyDown={(event) => handleEnterPressEvent(event)}
              >
                <IconChat />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="right-pannel">
          <div className="static-content flex justify-center flex-center column">
            <p>No message found</p>
            <button
              className="primary-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
            >
              New Message
            </button>
          </div>
        </div>
      )}
    </>
  );
}
