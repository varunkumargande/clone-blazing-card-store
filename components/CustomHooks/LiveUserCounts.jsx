import React from "react";
import { useEffect, useState } from "react";
import useJoinRTM from "./JoinRtm";

export default function useLiveUserCount(streamData, callback) {
  const [count, setUserCount] = useState(0);
  const [channel, setChannel] = useState(null);

  const { client } = useJoinRTM(streamData, setChannel);
  useEffect(() => {
    if(channel)
    callback(channel);
  },[channel])
  
  useEffect(() => {
    const id = setInterval(() => {
      getUserCount();
    }, 5000);
    return () => {
      clearInterval(id);
    };
  });

  const getUserCount = async () => {
    await client
      ?.getChannelMemberCount([streamData?.option?.messageChannel])
      .then(async (members) => {
        setUserCount(members[streamData?.option?.messageChannel]);
      })
      .catch((e) => {
        
      });
  };

  return { count, channel, client };
}
