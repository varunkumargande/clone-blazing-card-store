import React, { useState, useEffect } from "react";
import StreamingElement from "./StreamingElement";
import { getToken } from "../../../api/stream/getToken";
import AgoraRTM from "agora-rtm-sdk";
import Timer from "./Timer";
import { createBid } from "../../../api/stream/createBid";
import { getWinnerDetails } from "../../../api/stream/getWinnerDetails";
import { useSelector } from "react-redux";
import IconSpeaker from "../../Icons/IconSpeaker";
import IconShare from "../../Icons/IconShare";
import IconHeart from "../../Icons/IconHeart";
import IconDoller from "../../Icons/IconDoller";
import IconEye from "../../Icons/IconEye";
import IconClose from "../../Icons/IconClose";
import { CustomBidModal,ShippingTaxesModal,ShareModalModal } from "../../partials/Modal/Modal";

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
  const stream = useSelector((state) => state.stream);
  const isLoggedIn = stream?.streamPageData?.streamPageDteails?.isLoggedIn;
  const [openShipPayDetails, setOpenShipPayDetails] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen ] = useState(false)
  
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
    setIsMute(!isMute);
  };
  const handleCustomBid = () => {
    setOpen(true);
  };
  const handleShareButton = () => {
    setIsShareModalOpen(true)
  }
  useEffect(() => {
    let auctionId = 1;
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          setDisableBid(true);
          getWinnerDetails(auctionId)
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
    if (changedVolume) {
      setVolumeLevel(changedVolume);
    }
  };

  const checkBidAmount = () => {
    if (amountToBid > bidAmount) setAmountToBid(amountToBid - 1);
  }
  
  const increaseBidAmount = () =>{
    setAmountToBid(amountToBid+1)
  }

  const handleShipModal = () => {
    setOpenShipPayDetails(true)
  }
  return (
    <>
      <div className="stream-wrapper">
        <div className="overlay-sighin"></div>
        <div className="stream-image-video">
          {/* <img src="/static/images/stream-image.jpg" alt="stream" /> */}
          <StreamingElement volume={volumeLevel} isMute={isMute} />
        </div>
        <div className="inner-wrapper">
          {/*add className disable when want {disable}*/}
          <div className="stream-header flex space-between">
            {isLoggedIn ? (
              <>
                <div className="head-title">PSA SLAB #83</div>
              </>
            ) : (
              <>
                <div className="head-title">Please login to participate</div>
              </>
            )}
            <div className="tme-wrap flex flex-center justify-center">
              <IconEye />
              <span>1.2K</span> <button className="live">Live</button>
            </div>
            {/* <div className="tme-wrap end flex flex-center justify-center"><span>1.2K</span></div> */}
          </div>
          <div className="video-icon">
            <button className="flex flex-center justify-center br50" onClick={handleMuteButton} disabled={isMute ? true : false}>
              <IconSpeaker />
            </button>
            <button className="flex flex-center justify-center br50" onClick={handleShareButton}>
              <IconShare />
            </button>
            <button className="flex flex-center justify-center br50">
              <IconHeart />
            </button>
            <button className="flex flex-center justify-center br50">
              <IconDoller />
            </button>
          </div>
          {/*Auction end Html*/}
          {/* <div className="auction-end-text text-center">     
                    <h3>Live Stream Ended</h3>
                    <p>The live video has ended you can <br/>no longer to view</p>
                </div> */}
          {/* winner profile*/}
          {/* <div className="winner-profile flex flex-center">
                    <div className="pf br50"><img src="/static/images/profile.png" alt="" /></div>
                    ad_marie <span> &nbsp; is winner 🎉</span>
                </div> */}
          <div className="stream-footer flex flex-center space-between">
            <div className="left">
              <div className="time-left">
                Time left - <Timer minutes={minutes} seconds={seconds} />
              </div>
              <div className="bid-status flex flex-center">
                Current Bid - ${bidAmount} + Ship/Tax{" "}
                <span className="flex flex-center justify-center br50" onClick={handleShipModal}>i</span>
                
              </div>
            </div>
            {minutes == 0 && seconds == 0 ? (
              <div className="auction-end">
                <button className="primary-btn disable">Auction Ended</button>
              </div>
            ) : (
              <div className="btn-wrap flex space-between">
                <button
                  className={disableBid ? "border-btn disable" : "border-btn"}
                  disabled={disableBid}
                  onClick={handleCustomBid}
                >
                  Custom Bid
                </button>
                <button
                  className={disableBid ? "primary-btn disable" : "primary-btn"}
                  disabled={disableBid}
                  onClick={handleConfirmBid}
                >
                  Bid US ${amountToBid}
                </button>
              </div>
            )}
          </div>
        </div>

        {open ? (
          <>
            <CustomBidModal
              setOpen={setOpen}
              minutes={minutes}
              seconds={seconds}
              bidAmount={bidAmount}
              increaseBidAmount={increaseBidAmount}
              amountToBid={amountToBid}
              handleConfirmBid={handleConfirmBid}
              checkBidAmount={checkBidAmount}
            />
          </>
        ) : (
          <></>
        )}

        {
          openShipPayDetails ? <><ShippingTaxesModal setOpenShipPayDetails={setOpenShipPayDetails}/></> : <></>
        }
        {
          isShareModalOpen ? <><ShareModalModal setIsShareModalOpen={setIsShareModalOpen}/></> : <></>
        }
      </div>
    </>
  );
}
export default StreamingBase;
