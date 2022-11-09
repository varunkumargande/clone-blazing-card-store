import React, { useState, useEffect, useRef, memo } from "react";
import { useSelector } from "react-redux";
import { agoraGettToken } from "../../../api/stream/agora";
import AgoraRTC from "agora-rtc-sdk-ng";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../Constants/imageTransformation";
const StreamingElement = ({ volume, isMute }) => {
  const options = useSelector((state) => state?.stream?.streamPageData?.option);
  const streamData = useSelector((state) => state?.stream?.streamData);
  const rtc = useRef({});
  const [remoteUser, setRemoteUser] = useState(null);
  const [remoteAudioTrack, setRemoteAudioTrack] = useState(null)

  useEffect(() => {
    const volumeLevel = !!isMute ? 0 : volume;
    if (!!remoteAudioTrack) {
      remoteAudioTrack?.setVolume(volumeLevel);
    }
  }, [isMute, volume]);
  
  useEffect(() => {
    rtc.current.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
    joinChannelAsAudience();
    return async () => {
      if (rtc?.current?.client) {
        await rtc?.current?.client.leave();
      }
    };
  }, [options]);

  const joinChannelAsAudience = async () => {
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
          setRemoteAudioTrack(user.audioTrack);
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
    return response.rtcToken;
  };

  return (
    <>
      {" "}
      {remoteUser ? (
        <div
          id="local_stream"
          className="local_stream"
          style={{ width: "100%", height: "100%" }}
        ></div>
      ) : !!streamData ? (
        streamData?.preview_image_path && streamData?.preview_image ? (
          <CloudinaryImage
            imageUrl={streamData?.preview_image_path+"/"+streamData?.preview_image}
            keyId={`streamID${streamData?.uuid}`}
            transformation={ImageTransformation.streamThumnail}
            alternative="stream Image"
          />
        ) : (
          <>
          <CloudinaryImage imageUrl="defaultCard.png" />
          </>
        )
      ) : (
        <CloudinaryImage imageUrl="defaultCard.png" />
      )}
    </>
  );
};

export default memo(StreamingElement);
