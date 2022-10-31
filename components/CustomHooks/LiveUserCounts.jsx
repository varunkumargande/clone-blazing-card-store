import React from "react";
import { useEffect, useState } from "react";
import useJoinRTM from "./JoinRtm";

export default function useLiveUserCount(streamData, callback) {
  const [count, setUserCount] = useState(0);
  const [channel, setChannel] = useState(null);

  const { client } = useJoinRTM(streamData, setChannel);

  useEffect(() => {
    const id = setInterval(() => {
      getUserCount();
    }, 5000);
    return () => {
      clearInterval(id);
    };
  });

  const getUserCount = async () => {
    callback(channel);
    await channel
      ?.getMembers()
      .then(async (members) => {
        setUserCount(members?.length);
      })
      .catch((e) => {
        
      });
  };

  return { count, channel, client };
}
