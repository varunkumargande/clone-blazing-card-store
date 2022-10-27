import AgoraRTM from "agora-rtm-sdk";
import React from "react";
import { useEffect, useState } from "react";
import { getToken } from "../../api/stream/getToken";

export default function useJoinRTM(streamData, callBack) {
  useEffect(() => {
    joinChannel()
  }, [streamData])

  const joinChannel = async () => {
    const options = streamData?.option;
    if (options?.appId) {
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
      callBack(channel)
    }
  }
  return null;
}