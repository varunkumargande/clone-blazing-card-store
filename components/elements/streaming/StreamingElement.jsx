import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../api/stream/agora";
import AgoraRTC from "agora-rtc-sdk-ng";

const StreamingElement = () => {
  const dispatch = useDispatch();
  const streamingDetails = useSelector((state) => state?.stream?.streamData);
  const [volumeLevel, setVolumeLevel] = useState(100);
  const [mute, setMute] = useState(false);
  const [rtc, setRtc] = useState({});
  const [remoteUser, setRemoteUser] = useState(null);
  const [userType, setuserType] = useState("");
  const TYPES = {
    host: "host",
    audience: "audience",
  };

  console.log(streamingDetails, "streamingDetails");
  const options = {
    appID: "b87550aad4dc4aadb5219b7487c973fd",
    channel: "PIKACHU",
    host: String(Math.floor(Math.random() * 232)),
    audience: String(Math.floor(Math.random() * 232)),
  };

  useEffect(() => {
    const volumeLevel = mute ? 0 : 100;
    setVolumeLevel(Number(volumeLevel));
    if (rtc.localAudioTrack) {
      rtc?.localAudioTrack?.setVolume(volumeLevel);
    }
    if (remoteUser) {
      remoteUser?.audioTrack?.setVolume(volumeLevel);
    }
  }, [mute]);

  useEffect(() => {
    if (!Object.keys(rtc)) {
      initiateRTCObject();
    }
    if (Object.keys(rtc)) {
      rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
      joinChannelAsAudience();
      console.log('rtc useEffect');
    }
  }, [rtc]);

  const handleMuteButton = () => {
    setMute(!mute);
  };

  const initiateRTCObject = () => {
    setRtc({
      client: null,
      localAudioTrack: null,
      localVideoTrack: null,
      joined: false,
      published: false,
      localStream: null,
      remoteStream: [],
      params: {},
    });
  };

  const joinChannelAsAudience = async () => {
    if (options.appID) {
      rtc.client.setClientRole(TYPES.audience);
      const token = await getRtcToken(options.audience, TYPES.audience, "uid");
      await rtc?.client?.join(
        options.appID,
        options.channel,
        token,
        options.audience
      );
      rtc?.client?.on("user-published", async (user, mediaType) => {
        await rtc?.client?.subscribe(user, mediaType);
        setRemoteUser(user);
        if (mediaType === "video") {
          const remoteVideoTrack = user.videoTrack;
          remoteVideoTrack?.play("local_stream");
        }
        if (mediaType === "audio") {
          const remoteAudioTrack = user.audioTrack;
          user?.audioTrack?.setVolume(volumeLevel);
          remoteAudioTrack?.play();
        }
        setuserType(TYPES.audience);
      });

      rtc.client.on("user-unpublished", (user) => {
        const remotePlayerContainer = document.getElementById("local_stream");
        remotePlayerContainer = "";
      });
    }
  };

  const getRtcToken = async (uid, role, tokenType) => {
    const url = `/stream/getStreamToken?token=RTC&channel=${options.channel}&role=${role}&tokentype=${tokenType}&uid=${uid}`;
    console.log(url);
    const response = await getToken(url);
    return response.rtcToken;
  };

  const changeVolume = ({ value }) => {
    if (value == "" || value == undefined) return;
    if (rtc.localAudioTrack) {
      rtc.localAudioTrack.setVolume(volumeLevel);
    }
    if (remoteUser) {
      remoteUser.audioTrack.setVolume(volumeLevel);
    }
    setVolumeLevel(Number(value));
  };
  return (
    <>
      <div>
        <p>Hi hello Streaming</p>
        <div
          id="local_stream"
          className="local_stream"
          style={{ width: "510px", height: "600px" }}
        ></div>
      </div>
    </>
  );
};

export default StreamingElement;
