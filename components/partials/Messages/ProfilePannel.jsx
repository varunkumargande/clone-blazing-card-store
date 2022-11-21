import React from "react";
import IconAddChat from "../../Icons/IconAddChat";
import { DefaultImagePath } from "../../Constants/imageConstants";
import Styles from '../../../modular_scss/message.module.scss';

export default function ProfilePannel({
  contacts,
  changeCurrentChat,
  setIsOpen,
  userCount,
  setChatPanelVisible,
  setCurrentUser,
  currentUser,
}) {
  const handleSelectChatUser = (index) => {
    changeCurrentChat(index);
    setChatPanelVisible(true);
    setCurrentUser(index);
  };

  return (
    <div className="profile-wrapper">
      {contacts.length ? (
        <>
          <div className="profile-title-wrap flex space-between flex-center">
            <div className="title">
              <span>{userCount}</span>Total User
            </div>
            <button
              className="btn-chat flex flex-center justify-center br50"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectChatUser(index);
                    }}
                    key={`${item.username}-profile-panel`}
                  >
                    <div className="profile-image-title flex flex-center">
                      <div className={`image br50 ${Styles.images}`}>
                        <img
                          src={
                            item?.avatarImage == ""
                              ? DefaultImagePath.defaultProfileImage
                              : `${process.env.NEXT_PUBLIC_CLOUD_IMAGE_URL}${process.env.NEXT_PUBLIC_CHAT_PROFILE_IMAGE_SIZE}${item.avatarImage}`
                          }
                          width="40"
                          height="40"
                          alt=""
                        />
                      </div>
                      <div className="profile-text">
                        <div className="name flex flex-center">
                          {item?.firstName} {item?.lastName}
                          {currentUser == index && (
                            <span className="new"></span>
                          )}
                        </div>
                        <div className="time">@{item?.username}</div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : (
        <div className="static-content flex justify-center flex-center column">
          <p>Send private messages, photos, or videos to a friend or seller.</p>
        </div>
      )}
    </div>
  );
}
