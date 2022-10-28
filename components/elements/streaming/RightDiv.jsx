import React, { useState, useEffect } from "react";
import IconChat from "../../Icons/IconChat";
import { ImageTransformation } from "../../Constants/imageTransformation";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { connect } from "react-redux";
import { SignUPGoogle } from "../../partials/Modal/Modal";

// import useJoinRTM from "../../CustomHooks/JoinRtm"; // do not remove
// import useLiveUserCount from "../../CustomHooks/LiveUserCounts";

function RightDiv({ streamData, channel, client, auth }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const profileUrl = streamData?.streamPageDteails?.avatarImage;

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
          };
          setMessages((messages) => [...messages, messageObject]);
        }
      });
      return () => {
        client.logout();
        channel.leave();
      };
    }
  }, [channel]);

  // do not remove

  // const {count} = useLiveUserCount(streamData, setChannel);

  // useEffect(() => {
  //   setUserCount(count)
  // }, [count])

  const sendAndUpdateMessage = async (initialMessage = null) => {
    if (!auth.isLoggedIn && initialMessage !== "JOINED 👋") {
      setShowLoginModal(true);
      setInputValue("");
    } else if (initialMessage || inputValue) {
      const options = streamData?.option;
      const message = initialMessage ?? inputValue;
      const messageObject = {
        message,
        userId: options.audience + options.audienceId,
        profileUrl: profileUrl,
      };

      setMessages((messages) => [...messages, messageObject]);
      await channel.sendMessage({
        text: JSON.stringify({ text: message, profileUrl: profileUrl }),
        type: "text",
      });
      setInputValue("");
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

  const getMessages = () => {
    if (!messages) return <></>;
    return (
      <>
        <div className="chat-inner-wrap flex column justify-right">
          {messages?.map(({ message, userId, profileUrl }) => {
            return (
              <>
                <div className="flex flex-center chat">
                  <div className="chat-img br50">
                    <CloudinaryImage
                      imageUrl={profileUrl}
                      keyId={`chatBox${userId}`}
                      transformation={ImageTransformation.streamChatProfile}
                      alternative="profile"
                    />

                    {/* // ToDo: Need to remove commented code. Keeping it for refrence for now. */}
                    {/* <img
                      src={streamData?.streamPageDteails?.avatarImage}
                      alt="profile"
                      key={`chatBox${userId}`}
                    /> */}
                  </div>
                  <div className="chat-text-wrap">
                    <div className="name">{userId.replace(/\d+/g, "")}</div>
                    <div className="chat">{message}</div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="streaming-right">
        {showLoginModal && (
          <SignUPGoogle
            customMsg={
              "In order to chat in the stream, you need to sign up or log in."
            }
            onDismiss={(e) => {
              e.preventDefault();
              setShowLoginModal(false);
            }}
          />
        )}
        <div className="chat-wrap">{getMessages()}</div>
        <div className="input-chat">
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
        </div>
      </div>
    </>

    // <div className="streaming-div-right">
    //   {getMessages()}
    //   <div className="streaming-chat-box">
    //     <Input
    //       style={{ width: "calc(100% - 200px)" }}
    //       placeholder="Please type here..."
    //       value={inputValue}
    //       onChange={(e) => inputChange(e)}
    //     />
    //     <Button onClick={() => sendAndUpdateMessage(null)} type="primary">
    //       Submit
    //     </Button>
    //   </div>
    // </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(RightDiv);
