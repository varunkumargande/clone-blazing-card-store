import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input, Button } from "antd";
import AgoraRTM from "agora-rtm-sdk";
import { getToken } from "../../../api/stream/getToken";
import { FaWpbeginner } from "react-icons/fa";
import IconChat from "../../Icons/IconChat";

function RightDiv({ streamingDetails, streamData }) {
  const [channel, setChannel] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  let userDetails = sessionStorage.getItem("spurtUser");
  userDetails = JSON.parse(userDetails);

  useEffect(() => {
      joinChannel();
  }, []);

  useEffect(() => {
    if (channel) {
      sendAndUpdateMessage("JOINED 👋");
      channel.on("ChannelMessage", (message, peerId) => {
        if (message.messageType === "TEXT") {
          const messageObject = { message: message.text, userId: peerId };
          setMessages((messages) => [...messages, messageObject]);
        }
      });
    }
  }, [channel]);

  const joinChannel = async () => {
    const options = streamData?.option;
    const client = AgoraRTM.createInstance(options.appId);
    const token = await getToken(
      options.rtm,
      options.messageChannel,
      options.audience + options.audienceId,
      options.accountType,
      options.userType
    );

    await client.login({ uid: options.audience + options.audienceId, token });
    const channel = client.createChannel(options.messageChannel);
    await channel.join();
    setChannel(channel);
    return channel;
  };

  const sendAndUpdateMessage = async (initialMessage = null) => {
    const options = streamData?.option;
    const message = initialMessage ?? inputValue;
    const messageObject = { message, userId: options.audience };
    setMessages((messages) => [...messages, messageObject]);
    await channel.sendMessage({ text: message, type: "text" });
    setInputValue("");
    // channel.on("MemberJoined", (memberId) => {});
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
        {messages?.map(({ message, userId }) => {
          return (
            <>
              <div className="flex flex-center chat">
                <div className="chat-img br50">
                  <img
                    src={streamData?.streamPageDteails?.avatarImage}
                    alt="profile"
                    key={`chatBox${userId}`}
                  />
                </div>
                <div className="chat-text-wrap">
                  <div className="name">{userId}</div>
                  <div className="chat">{message}</div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="streaming-right">
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

export default RightDiv;
