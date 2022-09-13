import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Input, Button } from "antd";
import AgoraRTM from "agora-rtm-sdk";
import { getToken } from "../../../api/stream/agora";
import { FaWpbeginner } from "react-icons/fa";
import { useRouter } from "next/router";

function RightDiv() {
  const TYPES = {
    host: "host",
    audience: "audience",
  };

  const [channel, setChannel] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [options, setoptions] = useState(null);
  const router = useRouter();
  const hostId = router.query["host"];
  const audienceId = router.query["audience"];
  const userType = hostId ? 'host' : 'audience';

  useEffect(() => {
    if (!options) {
      setoptions({
        appID: "cb08a368d17648e9ab2886e3d1100a5e",
        channel: "POKEMON",
        host: "HOST",
        audience: "guest" + audienceId,
      });
    }

    if (options) {
      joinChannel();
    }
  }, [options]);

  useEffect(() => {
    if (channel) {
      sendAndUpdateMessage("JOINED");
      channel.on("ChannelMessage", (message, peerId) => {
        if (message.messageType === "TEXT") {
          const messageObject = { message: message.text, userId: peerId };
          setMessages(messages => [...messages, messageObject]);
        }
      });
    }
  }, [channel]);

  const joinChannel = async () => {
    const client = AgoraRTM.createInstance(options.appID);
    const token = await getRtmToken(options[userType]);
    await client.login({ uid: options[userType], token });
    const channel = await client.createChannel(options.channel);
    await channel.join();
    setChannel(channel);
    return channel;
  };

  const sendAndUpdateMessage = async (initialMessage = null) => {
    const message = initialMessage ?? inputValue;
    const messageObject = { message, userId: options[userType] };
    setMessages(messages => [...messages, messageObject]);
    await channel.sendMessage({ text: message, type: "text" });
    setInputValue("");
    channel.on("MemberJoined", (memberId) => {

    });
  };

  const inputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const getMessages = () => {
    if(!messages) return <></>
    return (
      <>
        {messages?.map(({ message, userId }) => {
          return (
            <div id={options[userType]}>
              <p>{userId + " : " + message}</p>
            </div>
          );
        })}
      </>
    );
  };

  const getRtmToken = async (uuid) => {
    const url = `/stream/getStreamToken?token=RTM&uid=${uuid}`;
    const response = await getToken(url);
    return response.rtcToken;
  };

  return (
    <div className="streaming-div-right">
      {getMessages()}
      <div className="streaming-chat-box">
        <Input
          style={{ width: "calc(100% - 200px)" }}
          placeholder="Kripya Yaha Likhe"
          value={inputValue}
          onChange={(e) => inputChange(e)}
        />
        <Button onClick={() => sendAndUpdateMessage(null)} type="primary">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default RightDiv;
