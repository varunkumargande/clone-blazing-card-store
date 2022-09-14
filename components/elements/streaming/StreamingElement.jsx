import React, {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../../api/stream/agora";
import AgoraRTC from "agora-rtc-sdk-ng";

const StreamingElement = () => {
  const dispatch = useDispatch();
  const streamingDetails = useSelector(state => state);
  const [volumeLevel, setVolumeLevel] = useState(100);
  const [mute, setMute] = useState(false);
  const [rtc, setRtc] = useState({});
  const [remoteUser, setRemoteUser] = useState(null);
  const [userType, setuserType] = useState("");
  const TYPES = {
    host : "host",
    audience: "audience"
  }

  const options = {appID: "cb08a368d17648e9ab2886e3d1100a5e",
  channel: "PIKACHU",
  host: String(Math.floor(Math.random() * 232)),
  audience: String(Math.floor(Math.random() * 232)),}

  useEffect(() => {
    const volumeLevel = mute ? 0 : 100;
    setVolumeLevel(Number(volumeLevel));
    if(rtc.localAudioTrack) {
        rtc?.localAudioTrack?.setVolume(volumeLevel)
    }
    if(remoteUser) {
        remoteUser?.audioTrack?.setVolume(volumeLevel);
    }
  }, [mute]);

  useEffect(() => {
    if(!Object.keys(rtc)) {
      initiateRTCObject();
    }
    if(Object.keys(rtc)){
      joinChannelAsAudience()
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

  rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });

  // const joinChannelAsHost = async () => {
  //   rtc.client.setClientRole(TYPES.host);
  //   const token = await getRtcToken(options.host, "publisher", "userAccount")
  //   await rtc.client.join(options.appID, options.channel, token, options.host);
  //   rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  //   rtc.localAudioTrack.setVolume(volumeLevel)
  //   rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
  //   rtc.localStream = await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
  //   rtc.localVideoTrack.play('local_stream');
  //   setuserType(TYPES.host);
  // }

  const joinChannelAsAudience = async () => {
    if(options.appID){
      rtc.client.setClientRole(TYPES.audience);
    // const token = await getRtcToken(options.audience, TYPES.audience, 'uid')
    const token = "007eJxTYDj9pPF/QjKbvveBxCyTVoWvRxuW5Zz8Kyv2+u4ChbO7VvQpMCQnGVgkGptZpBiam5lYpFomJhlZWJilGqcYGhoYJJqm/pqtmFz1Vil5ZTgbCyMDBIL47AwBnt6Ozh6hDAwAWTYjOw==";
    await rtc?.client?.join(options.appID, options.channel, token, options.audience);
    rtc?.client?.on("user-published", async (user, mediaType) => {
      await rtc?.client?.subscribe(user, mediaType);
      setRemoteUser(user)
      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack?.play('local_stream');
      }
      if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        user?.audioTrack?.setVolume(volumeLevel)
        remoteAudioTrack?.play();
      }
      setuserType(TYPES.audience);
    });

    rtc.client.on("user-unpublished", user => {
      const remotePlayerContainer = document.getElementById('local_stream');
      remotePlayerContainer = "";
    });
    } 
  };

  const getRtcToken = async (uid, role, tokenType) => {
    const url = `/rtc/${options.channel}/${role}/${tokenType}/:${uid}`;
    // const url = `/stream/getStreamToken?token=RTC&channel=${options.channel}&role=${role}&tokentype=${tokenType}&uid=${uid}`;
    console.log(url)
    const response = await getToken(url);
    return response.rtcToken;
  }

  const changeVolume = ({ value }) => {
    if (value == "" || value == undefined) return;
    if(rtc.localAudioTrack) {
        rtc.localAudioTrack.setVolume(volumeLevel)
    }
    if(remoteUser) {
        remoteUser.audioTrack.setVolume(volumeLevel);
    }
    setVolumeLevel(Number(value));

  };
  return (<>
    <div>
      <p>Hi hello Streaming</p>
      <div id="local_stream" className="local_stream" style={{ width: "510px", height: "600px" }}></div>
    </div>
  </>);
}

export default StreamingElement;


