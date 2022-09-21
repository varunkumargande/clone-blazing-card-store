import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agoraGettToken } from "../../../api/stream/agora";
import AgoraRTC from "agora-rtc-sdk-ng";

const StreamingElement = ({ volume, isMute }) => {
  const options = useSelector((state) => state?.stream?.streamPageData?.option);

  const [volumeLevel, setVolumeLevel] = useState(volume);
  const rtc = useRef({});
  const [remoteUser, setRemoteUser] = useState(null);

  useEffect(() => {
    const volumeLevel = !!isMute ? 0 : 100;
    setVolumeLevel(Number(volumeLevel));
    if (!!remoteUser?.audioTrack) {
      remoteUser?.audioTrack?.setVolume(volumeLevel);
    }
  }, [isMute]);

  useEffect(() => {
    rtc.current.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
    joinChannelAsAudience();
    return async () => {
      if (rtc?.current?.client) {
        await rtc?.current?.client.leave();
      }
    };
  }, []);

  const joinChannelAsAudience = async () => {
    console.log(options, "++++++++++++++++++++++++++++++=");
    if (options && options.userType) {
      rtc.current.client.setClientRole(options.userType);

      const token = await getRtcToken(
        options.audienceId,
        options.userType,
        "uid"
      );

      await rtc.current.client.join(
        options.appId,
        options.streamChannel,
        token,
        options.audienceId
      );

      rtc.current.client.on("user-published", async (user, mediaType) => {
        // Subscribe to a remote user.
        await rtc.current.client.subscribe(user, mediaType);
        setRemoteUser(user);
        // If the subscribed track is video.
        if (mediaType === "video") {
          // Get `RemoteVideoTrack` in the `user` object.
          const remoteVideoTrack = user.videoTrack;
          remoteVideoTrack.play("local_stream");
        }

        // If the subscribed track is audio.
        if (mediaType === "audio") {
          // Get `RemoteAudioTrack` in the `user` object.
          const remoteAudioTrack = user.audioTrack;
          // Play the audio track. No need to pass any DOM element.
          remoteAudioTrack.play();
        }
        // setuserType(TYPES.audience);
      });

      rtc.current.client.on("user-unpublished", (user) => {
        // Get the dynamically created DIV container.
        const remotePlayerContainer = document.getElementById("local_stream");
        // Destroy the container.
        remotePlayerContainer = "";
      });
    }
  };

  const getRtcToken = async (uid, role, tokenType) => {
    const url = `/stream/getStreamToken?token=RTC&channel=${options.streamChannel}&role=${role}&tokentype=${tokenType}&uid=${uid}`;
    const response = await agoraGettToken(url);
    console.log(response, "token response.");
    return response.rtcToken;
  };

  return (
    <>
      {" "}
      {remoteUser ? (
        <div
          id="local_stream"
          className="local_stream"
          // style={{ width: "510px", height: "600px" }}
        ></div>
      ) :  <img src="/static/images/stream-image.jpg" alt="stream" />}
    </>
  );
};

export default StreamingElement;
