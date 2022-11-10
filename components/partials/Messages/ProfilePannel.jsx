import React from "react";
import IconAddChat from "../../Icons/IconAddChat";
import { imageUrl } from "../../../api/url";

export default function ProfilePannel({
  contacts,
  changeCurrentChat,
  setIsOpen,
  userCount,
  setChatPanelVisible,
}) {
  const handleSelectChatUser = (index) => {
    changeCurrentChat(index);
    setChatPanelVisible(true);
  };

  return (
    <div className="profile-wrapper">
      {/* <div className=" static-content flex justify-center flex-center column">
                <p>Send private messages, photos, or videos to a friend or seller.</p>
            </div> */}
      <div className="profile-title-wrap flex space-between flex-center">
        <div className="title">
          <span>{userCount}</span>Total User
        </div>
        <button
          className="btn-chat flex flex-center justify-center br50"
          onClick={() => setIsOpen(true)}
        >
          <IconAddChat />
        </button>
      </div>
      <div className="profile-chat-list-wrap">
        {contacts?.map((item, index) => {
          return (
            <>
              <div
                className="profile-chat-list flex space-between"
                onClick={() => handleSelectChatUser(index)}
              >
                <div className="profile-image-title flex flex-center">
                  <div className="image br50">
                    <img
                      src={
                        item?.avatarImage == ""
                          ? "/static/img/no-image.png"
                          : item?.avatarImage
                      }
                      alt=""
                    />
                  </div>
                  <div className="profile-text">
                    <div className="name">
                      {item?.firstName} {item?.lastName}{" "}
                      <span className="new"></span>
                    </div>
                    <div className="time">@{item?.username}</div>
                  </div>
                </div>
                {/* <div className="option">
                  <button className="three-dot flex flex-center justify-center column">
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div> */}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
