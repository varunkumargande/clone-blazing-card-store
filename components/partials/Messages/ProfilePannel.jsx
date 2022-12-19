import React, { useState } from "react";
import IconAddChat from "../../Icons/IconAddChat";
import { DefaultImagePath } from "../../Constants/imageConstants";
import Styles from "../../../modular_scss/message.module.scss";
import { getChatNotification } from "../../../api/chat/getChatNotification";
import { useEffect } from "react";

export default function ProfilePannel({
  contacts,
  changeCurrentChat,
  setIsOpen,
  userCount,
  setChatPanelVisible,
  setCurrentUser,
  currentUser,
  newNotification,
  setNewNotification,
  notificationData,
  setNotificationData,
  queryChatUserId,
  queryChatUserIndex
}) {

  useEffect(() => {
    if (queryChatUserIndex && queryChatUserId) {
      handleSelectChatUser(queryChatUserIndex, queryChatUserId);
    }
  }, [queryChatUserIndex])

  const handleSelectChatUser = (index, id) => {
    /**
     * these both function is use for remove read message satus in state
     **/
    setNewNotification((data) => data.filter((item) => item != id));
    setNotificationData((data) => data.filter((item) => item?.sender != id));
    // ========================================================================

    // this is function for change user for chat
    changeCurrentChat(index);
    // =========================================

    setChatPanelVisible(true);
    setCurrentUser(index);
  };

  const showNotificationStatus = (id) => {
    return notificationData.map((item) => {
      if (item?.sender == id) return <span className="new"></span>;
    });
  };

  const showTotalNotification = () => {
    const totalNotificationCount =
      notificationData?.length + newNotification.length;
    return totalNotificationCount;
  };

  return (
    <div className="profile-wrapper">
      {contacts?.length ? (
        <>
          <div className="profile-title-wrap flex space-between flex-center">
            <div className="title">
              <span>{showTotalNotification()}</span>New Notification
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
                      handleSelectChatUser(index, item._id);
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
                          {showNotificationStatus(item?._id)}
                          {newNotification.includes(item?._id) && (
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
