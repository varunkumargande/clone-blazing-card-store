import { message } from "antd";
import React, { useRef, useEffect } from "react";
import IconChat from "../../Icons/IconChat";
import IconGallery from "../../Icons/IconGallery";
import moment from 'moment'

export default function ChatPannel({
  messages,
  contactDetail,
  setMsg,
  msg,
  handleSendMsg,
}) {

  const divRef = useRef(null);
  console.log(msg)

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

  return (
    <>
      {!!contactDetail ? (
        <>
          <div className="right-pannel">
            {/* <div className=" static-content flex justify-center flex-center column">
                <p>No message found</p>
                <button className="primary-btn">New Message</button>
            </div> */}
            <div className="profile-header-title flex flex-center">
              <div className="image">
                <img
                  src={
                    contactDetail?.avatarImage == ""
                      ? "/static/img/no-image.png"
                      : contactDetail.avatarImage
                  }
                  alt=""
                />
              </div>
              <div className="profile-text">
                <div className="name">
                    {contactDetail?.firstName} {contactDetail?.lastName} <span className="new"></span>
                </div>
                  <div className="time">{contactDetail?.username}</div>
              </div>
            </div>
            <div className="chat-box-wrap">
              <div className="chat-box flex justify-right column">
                {messages.map((item, index) => {
                  if (item.fromSelf) {
                    return (
                      <>
                        <div className="chat-wrap right">
                          <div className="chat">{item?.message}</div>
                            <div className="time">{item?.time}</div>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div className="chat-wrap left">
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
        <>
          <div className="right-pannel"></div>
        </>
      )}
    </>
  );
}
