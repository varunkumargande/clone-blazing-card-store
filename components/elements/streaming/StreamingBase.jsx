import React, { useState, useEffect } from "react";
import StreamingElement from "./StreamingElement";
import { getToken } from "../../../api/stream/getToken";
import AgoraRTM from "agora-rtm-sdk";
import Timer from "./Timer";
import { createBid } from "../../../api/stream/createBid";
import { useSelector } from "react-redux";

function StreamingBase() {
  const [open, setOpen] = React.useState(false);
  const [bidAmount, setBidAmount] = React.useState(25);
  const [amountToBid, setAmountToBid] = React.useState(bidAmount + 2);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(25);
  const [disableBid, setDisableBid] = useState(false);
  /*****For notifications *****/
  const audienceId = Math.floor(Math.random() * 20);
  const [channel, setChannel] = useState(null);
  const COUNT_INC = 2;
  const [volumeLevel, setVolumeLevel] = useState(100);
  const [isMute, setIsMute] = useState(false);
  const stream = useSelector((state) => state.stream)
  const isLoggedIn = stream?.streamPageData?.streamPageDteails?.isLoggedIn

  useEffect(() => {
      isLoggedIn ? setDisableBid(false) : setDisableBid(true);
      joinChannel();
  }, []);

  const joinChannel = async () => {
    const options = stream?.streamPageData?.option;
    const client = AgoraRTM.createInstance(options.appId);
    const token = await getToken(
      options.rtm,
      options.notificationChannel,
      options.audience,
      options.accountType,
      options.userType
    );
    await client.login({ uid: options.audience, token });
    const channel = client.createChannel(options.notificationChannel);
    await channel.join();
    setChannel(channel);
    channel.on("Member Joined", function (memberId) {});
    return channel;
  };

  useEffect(() => {
    if (channel) {
      channel.on("ChannelMessage", function (message, memberId) {
        const { bidAmount, amountToBid, restartSeconds } = JSON.parse(
          message.text
        );
        if (restartSeconds != 0) setSeconds(restartSeconds);
        setBidAmount(bidAmount);
        setAmountToBid(amountToBid);
      });
    }
  }, [channel]);

  const handleConfirmBid = async () => {
    let message;
    let auctionId = 2;
    setOpen(false);
    createBid(auctionId, Number(audienceId), amountToBid);
    setBidAmount(amountToBid);
    setAmountToBid(amountToBid + COUNT_INC);
    if (seconds > 0) {
      if (seconds < 20) {
        setSeconds((sec) => sec + COUNT_INC);
        message = {
          bidAmount: amountToBid,
          amountToBid: amountToBid + COUNT_INC,
          restartSeconds: seconds + COUNT_INC,
        };
      } else {
        message = {
          bidAmount: amountToBid,
          amountToBid: amountToBid + COUNT_INC,
          restartSeconds: seconds,
        };
      }
    }
    message = JSON.stringify(message);
    await channel.sendMessage({ text: message, type: "text" });
  };
  /*****End notifications *****/
  const handleMuteButton = () => {
    setIsMute(!isMute)
  };
  const handleCustomBid = () => {
    setOpen(true);
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setDisableBid(true);
        } else if (seconds < 60) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const changeVolumeLevel = (event) => {
    event.preventDefault();
    const changedVolume = event?.target?.value;
    if(changedVolume) {
      setVolumeLevel(changedVolume);
    }
  }

  return (
    <>
      <StreamingElement volume={volumeLevel} isMute={isMute} />
      <span>38</span>
      <div className="stream-wrapper">
        <div className="overlay-sighin">
          { isLoggedIn ? <></>
            : <p>Please login to participate in the stream</p>
          }
          </div>
        <div className="overlay">
          <div className="product-info">
            <div id="winning-buyer-info">winner won!</div>
            <div id="product-name">Name</div>
            <div id="shipping-details">Shipping and tax</div>
          </div>
          <div className="video-info">
            <div className="volume">
              <input
                type="range"
                min="0"
                max="100"
                value={volumeLevel}
                className="volume-range"
                onChange={(e)=>{changeVolumeLevel(e)}}
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
                  Mute
                </button>
              </div>
            </div>
            <div id="pay-button">
              <button className=" curved-box">$</button>
              <div>Pay</div>
            </div>
            <div className="bidded-amount">$ {bidAmount}</div>

            <Timer minutes={minutes} seconds={seconds} />
          </div>
        </div>
        {disableBid ? (
          <div className="buyer-buttons">
            <button
              className="curved-box general-button-style disabled"
              id="custom-bid"
            >
              Custom
            </button>
            <button
              className="curved-box general-button-style disabled"
              id="bid-button"
            >
              Bid ${amountToBid}
            </button>
          </div>
        ) : (
          <>
            <div className="buyer-buttons">
              <button
                className="curved-box general-button-style"
                id="custom-bid"
                onClick={handleCustomBid}
              >
                Custom
              </button>
              <button
                className="curved-box general-button-style"
                id="bid-button"
                onClick={handleConfirmBid}
              >
                Bid ${amountToBid}
              </button>
            </div>
          </>
        )}

        {open ? (
          <>
            <div id="custom-bid-popup">
              <div className="close-modal">
                <button onClick={() => setOpen(false)}>X</button>
              </div>
              <div id="product-name-price">
                <div className="product-detail">Product name</div>
                <div className="product-detail">${bidAmount}</div>
              </div>
              <Timer minutes={minutes} seconds={seconds} />
              <div id="adjust-bidding-amount">
                <div>
                  <button
                    className=""
                    onClick={() => setAmountToBid(amountToBid - 1)}
                  >
                    -
                  </button>
                </div>
                <div>$ {amountToBid}</div>
                <div>
                  <button
                    className=""
                    onClick={() => setAmountToBid(amountToBid + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="buyer-buttons">
                <button
                  className="curved-box general-button-style"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="curved-box general-button-style"
                  id="confirm-bid"
                  onClick={handleConfirmBid}
                >
                  Confirm
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default StreamingBase;
