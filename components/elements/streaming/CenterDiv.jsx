import React, { useState } from "react";
import { useEffect } from "react";
import { getToken } from "../../../api/stream/agora";
import AgoraRTC from "agora-rtc-sdk-ng";


function CenterDiv({options}) {
  const [volumeLevel, setVolumeLevel] = useState(100);
  const [mute, setMute] = useState(false);
  const [rtc, setRtc] = useState({});
  const [remoteUser, setRemoteUser] = useState(null);
  const [userType, setuserType] = useState("");
  const TYPES = {
    host : "host",
    audience: "audience"
  }

  useEffect(() => {
    const volumeLevel = mute ? 0 : 100;
    setVolumeLevel(Number(volumeLevel));
    if(rtc.localAudioTrack) {
        rtc.localAudioTrack.setVolume(volumeLevel)
    }
    if(remoteUser) {
        remoteUser.audioTrack.setVolume(volumeLevel);
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

  const joinChannelAsHost = async () => {
    rtc.client.setClientRole(TYPES.host);
    const token = await getRtcToken(options.host, "publisher", "userAccount")
    await rtc.client.join(options.appID, options.channel, token, options.host);
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localAudioTrack.setVolume(volumeLevel)
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    rtc.localStream = await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    rtc.localVideoTrack.play('local_stream');
    setuserType(TYPES.host);
  }

  const joinChannelAsAudience = async () => {
    rtc.client.setClientRole(TYPES.audience);
    const token = await getRtcToken(options.audience, TYPES.audience, 'uid')
    await rtc.client.join(options.appID, options.channel, token, options.audience);
    rtc.client.on("user-published", async (user, mediaType) => {
      await rtc.client.subscribe(user, mediaType);
      setRemoteUser(user)
      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        remoteVideoTrack.play('local_stream');
      }
      if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        user.audioTrack.setVolume(volumeLevel)
        remoteAudioTrack.play();
      }
      setuserType(TYPES.audience);
    });

    rtc.client.on("user-unpublished", user => {
      const remotePlayerContainer = document.getElementById('local_stream');
      remotePlayerContainer = "";
    });
  };

  const getRtcToken = async (uid, role, tokenType) => {
    const url = `/stream/getStreamToken?token=RTC&channel=${options.channel}&role=${role}&tokenType=${tokenType}&uid=${uid}`;
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

  return (
    <div className="streaming-div-center">
      <div className="seller-info">
        <div id="seller-name">Seller's name</div>
        <div id="seller-rating">
          <span>4.96 169 Ratings</span>
        </div>
        <div id="followers">1,214 Followers</div>
        <button id="follow-button" className="curved-box">
          Follow
        </button>
      </div>
      <div className="social-presence">
        <div>
          <span id="link-address">
            <input
              placeholder="www.blazingcard.com/"
              className="curved-box"
            ></input>
          </span>
          <span id="copy-link">
            <button className="curved-box">Copy</button>
          </span>
        </div>
        <div id="social-links">Share to</div>
      </div>
      <div className="streaming-base">
      <div id="local_stream" className="local_stream" style={{ width: "310px", height: "600px" }}></div>
        <span>38</span>
        <div className="stream-wrapper">
          <div className="overlay">
            <div className="product-info">
              <div id="winning-buyer-info">winner won!</div>
              <div id="product-name">Product name</div>
              <div id="shipping-details">Shipping and tax</div>
            </div>
            <div className="video-info">
              <div className="volume">
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="volume-range"
                  value={volumeLevel}
                  onChange={(e) => changeVolume(e.target)}
                />
                <div className="bar-hoverbox">
                  <div classame="bar">
                    <div classame="bar-fill"></div>
                  </div>
                </div>
                <div>
                  <button
                    id="mute-button"
                    className="curved-box"
                    onClick={handleMuteButton}
                  >
                    {mute ? "Unmute" : "Mute"}
                  </button>
                </div>
                {/* <div>
                  <button
                    id="mute-button"
                    className="curved-box"
                    onClick={joinChannelAsHost}
                  >
                    Host
                  </button>
                </div>
                <div>
                  <button
                    id="mute-button"
                    className="curved-box"
                    onClick={joinChannelAsAudience}
                  >
                    Audience
                  </button>
                </div> */}
              </div>
              <div id="pay-button">
                <button className=" curved-box">$</button>
                <div>Pay</div>
              </div>
              <div id="amount">$25</div>
              <div id="timer">00:00</div>
            </div>
          </div>
          <div id="auction">
            <button className="curved-box">Auction ended</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CenterDiv;
