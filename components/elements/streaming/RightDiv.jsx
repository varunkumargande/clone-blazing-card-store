import React, { useState, useEffect, memo } from "react";
import Skeleton from "react-loading-skeleton";
import IconChat from "../../Icons/IconChat";
import {
  ImageTransformation,
  DefaultImagePath,
} from "../../Constants/imageConstants";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { useDispatch } from "react-redux";
import {
  BlockAndRemoveModal,
  BlockInfoModal,
  SignUPGoogle,
} from "../../partials/Modal/Modal";
import useEventSocket from "../../../hooks/useEventSocket";
import { notificationBaseUrl } from "../../../api/url";
import Router, { useRouter } from "next/router";
import { blockedUserListApi } from "../../../api/stream/blockedUserListApi";

// import useJoinRTM from "../../CustomHooks/JoinRtm"; // do not remove
// import useLiveUserCount from "../../CustomHooks/LiveUserCounts";
function RightDiv({ streamData, channel, client, streamingDetails }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isBlockAndRemoveModal, setBlockAndRemoveModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isBlockInfoModal, setIsBlockInfoModal] = useState(false);
  const router = useRouter();
  const uuid = router.query["uuid"];
  const profileUrl = streamData?.streamPageDteails?.avatarImage;
  const streamUUID = streamData?.streamPageDteails?.uuid;
  const vendorId = streamData?.streamPageDteails?.sellerId;
  const isModerator = streamingDetails?.moderator;
  const [blockedUserList, setBlockedUserList] = useState([]);
  const loggedInUserId = streamData?.streamPageDteails?.loggedInUserId;
  const stream_notification = useEventSocket(
    `${notificationBaseUrl}${uuid}-stream-notification`,
    fetch
  );

  useEffect(() => {
    getBlockedUserList();
  }, []);

  useEffect(() => {
    if (streamingDetails?.IsBlocked === 1) {
      setIsBlockInfoModal(true);
      setTimeout(() => {
        setIsBlockInfoModal(false);
        Router.push("/");
      }, 5000);
    }
  }, [streamingDetails?.IsBlocked]);

  useEffect(() => {
    if (channel) {
      sendAndUpdateMessage("JOINED 👋");
      channel.on("ChannelMessage", (message, peerId) => {
        if (message.messageType === "TEXT") {
          const messageJson = JSON.parse(message.text);
          const messageObject = {
            message: messageJson.text,
            profileUrl: messageJson.profileUrl,
            userId: peerId,
            id: messageJson.id,
          };
          setMessages((messages) => [...messages, messageObject]);
          document.getElementsByClassName("chat-wrap")[0].scrollTop =
            document.getElementsByClassName("chat-wrap")[0].scrollHeight;
        }
      });
      return () => {
        client.logout();
        channel.leave();
      };
    }
  }, [channel]);

  useEffect(() => {
    if (
      loggedInUserId &&
      stream_notification?.data &&
      stream_notification?.data?.type === "BLOCKED"
    ) {
      if (loggedInUserId === stream_notification?.data?.userId) {
        setIsBlockInfoModal(true);
        sendAndUpdateMessage("Blocked by host");
        setTimeout(() => {
          setIsBlockInfoModal(false);
          Router.push("/");
        }, 5000);
      } else {
        setBlockedUserList((blockedUserList) => [
          ...blockedUserList,
          stream_notification?.data?.userId,
        ]);
      }
    }
  }, [stream_notification?.data]);
  // do not remove

  // const {count} = useLiveUserCount(streamData, setChannel);

  // useEffect(() => {
  //   setUserCount(count)
  // }, [count])
  const getBlockedUserList = async () => {
    const blockedUserList = await blockedUserListApi(uuid);
  };
  const sendAndUpdateMessage = async (initialMessage = null) => {
    if (
      !streamData?.streamPageDteails.isLoggedIn &&
      initialMessage !== "JOINED 👋"
    ) {
      setShowLoginModal(true);
      setInputValue("");
    } else if (initialMessage || inputValue) {
      const options = streamData?.option;
      const message = initialMessage ?? inputValue;
      const messageObject = {
        message,
        userId: options.audience,
        profileUrl: profileUrl,
      };
      setMessages((messages) => [...messages, messageObject]);
      await channel.sendMessage({
        text: JSON.stringify({
          text: message,
          profileUrl: profileUrl,
          id: options.audienceId,
        }),
        type: "text",
      });
      setInputValue("");
      // Below line to scroll to bottom
      document.getElementsByClassName("chat-wrap")[0].scrollTop =
        document.getElementsByClassName("chat-wrap")[0].scrollHeight;
    }
  };

  const inputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const onKeyEnter = (e) => {
    if (e.key.toLowerCase() === "enter") {
      sendAndUpdateMessage();
    }
  };

  const showMessages = () => {
    if (!channel) {
      return (
        <div className="chat-inner-wrap flex column justify-right">
          {new Array(5).fill(0).map((_, index) => (
            <div key={`dummy-msg-${index}`} className="flex chat">
              <Skeleton
                className="chat-img br50"
                circle
                baseColor="#dddbdb66"
                highlightColor="#cdcccc"
              />
              <div className="chat-text-wrap">
                <div className="name">
                  <Skeleton
                    baseColor="#dddbdb66"
                    highlightColor="#cdcccc"
                    width={
                      index % 2 === 0
                        ? `50%`
                        : (index % 3 === 0 && `70%`) || `30%`
                    }
                  />
                </div>
                <div className="chat">
                  <Skeleton
                    baseColor="#dddbdb66"
                    highlightColor="#cdcccc"
                    width={
                      index % 2 === 0
                        ? `40%`
                        : (index % 3 === 0 && `70%`) || `100%`
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (!messages) return <></>;
    return (
      <div className="chat-inner-wrap flex column justify-right">
        {messages?.map(({ message, userId, profileUrl, index, id }) => {
          return (
            <div
              key={`message-${message}-${userId}-${index}`}
              className="flex flex-center chat"
            >
              <div className="chat-img br50">
                {message === "Blocked by host" ||
                blockedUserList.includes(id) ? (
                  <i class="fa fa-ban" aria-hidden="true"></i>
                ) : profileUrl ? (
                  <CloudinaryImage
                    imageUrl={profileUrl}
                    keyId={`chatBox${userId}`}
                    transformation={ImageTransformation.streamChatProfile}
                    alternative="profile"
                  />
                ) : (
                  <img
                    onError={() => {
                      currentTarget.onerror = null;
                      currentTarget.src = "/static/images/profileImg.png";
                    }}
                    height={16}
                    width={12}
                    src={DefaultImagePath.defaultProfileImage}
                    alt="Profile"
                  />
                )}
              </div>
              <div className="chat-text-wrap">
                <div
                  className="name pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!!id && isModerator && !blockedUserList.includes(id)) {
                      setUserInfo({
                        username: userId,
                        profileUrl: profileUrl,
                        id: id,
                      });
                      setBlockAndRemoveModal(true);
                    }
                  }}
                >
                  {userId}
                </div>
                <div
                  className={
                    message === "Blocked by host" ||
                    blockedUserList.includes(id)
                      ? "text-danger"
                      : "chat"
                  }
                >
                  {blockedUserList.includes(id) ? "Blocked by host" : message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div className="streaming-right">
      {showLoginModal && (
        <SignUPGoogle
          customMsg={
            "In order to chat in the stream, you need to sign up or log in."
          }
          onDismiss={setShowLoginModal}
        />
      )}
      <div className="chat-wrap">{showMessages()}</div>
      <div className="input-chat">
        {channel ? (
          <>
            <input
              type="text"
              placeholder="Please type here..."
              value={inputValue}
              onChange={(e) => inputChange(e)}
              onKeyDown={(e) => onKeyEnter(e)}
            />
            <button
              className="chat-btn flex flex-center justify-center br50"
              onClick={() => sendAndUpdateMessage()}
            >
              <IconChat />
            </button>
          </>
        ) : (
          <Skeleton
            baseColor="#dddbdb66"
            highlightColor="#cdcccc"
            width={`100%`}
            height={`35px`}
          />
        )}
      </div>
      {isBlockAndRemoveModal && (
        <BlockAndRemoveModal
          setBlockAndRemoveModal={setBlockAndRemoveModal}
          userInfo={userInfo}
          streamUUID={streamUUID}
          vendorId={vendorId}
        />
      )}
      {isBlockInfoModal && <BlockInfoModal />}
    </div>
  );
}

export default memo(RightDiv);
