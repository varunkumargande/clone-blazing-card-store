import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agoraGettToken } from "../../../api/stream/agora";
import { imageUrl } from "../../../api/url";
import AgoraRTC from "agora-rtc-sdk-ng";

const StreamingElement = ({ volume, isMute }) => {
  const options = useSelector((state) => state?.stream?.streamPageData?.option);
  const streamData = useSelector((state) => state?.stream?.streamData);
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
    return response.rtcToken;
  };

  // Do not remove
  // const getImagePath = (type) => {

  //   if(stream?.streamData?.vendorDetails?.avatar_path && stream?.streamData?.vendorDetails?.avatar && type == 'vendor') {
  //    return imageUrl + "?path=" + stream?.streamData?.vendorDetails?.avatar_path + "&name=" + stream?.streamData?.vendorDetails?.avatar + "&width=50&height=50";
  //   }
  //     return "/static/images/stream-image.jpg";
  // }

  return (
    <>
      {" "}
      {remoteUser ? (
        <div
          id="local_stream"
          className="local_stream"
          style={{ width: "100%", height: "100%" }}
        ></div>
      ) : // Do not remove this code
      // <img
      //     onError={({ currentTarget }) => {
      //       currentTarget.onerror = null; // prevents looping
      //       currentTarget.src="/static/images/stream-image.jpg";
      //     }}
      //       src={getImagePath('profile')}
      //     />
      !!streamData ? (
        streamData?.preview_image_path && streamData?.preview_image ? (
          <img
            src={
              imageUrl +
              "?path=" +
              streamData.preview_image_path +
              "&name=" +
              streamData.preview_image
            }
            alt="stream"
          />
        ) : (
          <><img src="/static/img/no-image.png" alt="stream" /></>
        )
      ): (
        <img src="/static/img/no-image.png" alt="stream" />
      )
      }
    </>
  );
};

export default StreamingElement;
