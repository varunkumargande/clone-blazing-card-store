import React, { useState, useEffect } from "react";
import StreamingElement from "./StreamingElement";
import { getToken } from "../../../api/stream/getToken";
import AgoraRTM from "agora-rtm-sdk";
import Timer from "./Timer";
import { createBid } from "../../../api/stream/createBid";
import { useSelector } from "react-redux";
import IconSpeaker from "../../Icons/IconSpeaker";
import IconShare from "../../Icons/IconShare";
import IconHeart from "../../Icons/IconHeart";
import IconDoller from "../../Icons/IconDoller";
import IconEye from "../../Icons/IconEye";
import { io } from "socket.io-client";
import {
  CustomBidModal,
  ShippingTaxesModal,
  ShareModalModal,
} from "../../partials/Modal/Modal";
import moment from "moment/moment";
import { notification } from "antd";
import { useRouter } from "next/router";

function StreamingBase({
  cardDetail,
  addressList,
  openPayment,
  currentAuction
}) {
  const stream = useSelector((state) => state.stream);
  const [open, setOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState(null);
  const [amountToBid, setAmountToBid] = useState(bidAmount + 2);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [disableBid, setDisableBid] = useState(false);
  /*****For notifications *****/

  const [volumeLevel, setVolumeLevel] = useState(100);
  const [isMute, setIsMute] = useState(false);
  const [openShipPayDetails, setOpenShipPayDetails] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [socketObject, setSocketObject] = useState(
    stream?.streamPageData.streamPageDteails.socketObject
  );
  const [auctionNotification, setAuctionNotification] = useState(null);
  const [bidNotification, setBidNotification] = useState(null);
  const [winnerNotification, setWinnerNotification] = useState(null);

  const router = useRouter();
  const uuid = router.query["uuid"];

  useEffect(() => {
    socketObject.on(`${uuid}-bid`, (bid) => {
      setBidNotification(bid);
      setWinner(null)
    });
    socketObject.on(`${uuid}-auction`, (auction) => {
      setAuctionNotification(auction);
      setWinner(null)
    });
    socketObject.on(`${uuid}-win`, (winner) => {
      setWinnerNotification(winner);
    });

  }, []);

  useEffect(() => {
    if (!!auctionNotification || !!bidNotification) {
      let [date, time] = auctionNotification?.auction?.endTime.split(" ") || bidNotification?.endTime.split(" ")
      const endTime = moment(date.replaceAll("-","/")+" "+time)
      const duration = moment.duration(
        endTime.diff(moment.utc().format("yyyy/MM/DD, hh:mm:ss"))
      );
      const minutes = Math.floor(duration.asSeconds() / 60);
      const seconds = Math.ceil(duration.asSeconds() % 60);
      setMinutes(minutes);
      setSeconds(seconds);
      if (stream?.streamPageData?.streamPageDteails?.isLoggedIn) {
        setDisableBid(false);
      }
      if (bidNotification) {
        setBidAmount(bidNotification?.bidAmount);
      }
    }
  }, [bidNotification, auctionNotification]);


  const handleConfirmBid = async () => {
    if (cardDetail.length == 0 && addressList.length == 0) {
      openPayment(true);
    } else {
      let message;
      let auctionId = auctionNotification?.auction.id;
      setOpen(false);
      increaseBidAmount();
      createBid(
        auctionId,
        Number(stream?.streamPageData.streamPageDteails.loggedInUserId),
        amountToBid
      );
      // setBidAmount(amountToBid);
      // setAmountToBid(amountToBid + COUNT_INC);
    }
  };
  /*****End notifications *****/
  const handleMuteButton = () => {
    setIsMute(!isMute);
  };
  const handleCustomBid = () => {
    setOpen(true);
  };
  const handleShareButton = () => {
    setIsShareModalOpen(true);
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
    if (changedVolume) {
      setVolumeLevel(changedVolume);
    }
  };

  const checkBidAmount = () => {
    if (amountToBid > bidAmount) setAmountToBid(amountToBid - 1);
  };

  const increaseBidAmount = () => {
    setAmountToBid(amountToBid + 1);
  };

  const handleShipModal = () => {
    setOpenShipPayDetails(true);
  };

  const getAuctionArea = () => {
    return (
      <>
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
      </>
    );
  };
  return (
    <>
      <div className="stream-wrapper">
        <div className="overlay-sighin"></div>
        <div className="stream-image-video">
          {/* <img src="/static/images/stream-image.jpg" alt="stream" /> */}
          <StreamingElement volume={volumeLevel} isMute={isMute} />
        </div>
        <div className="inner-wrapper">
          <div className="stream-header flex space-between">
            {stream?.streamPageData?.streamPageDteails?.isLoggedIn ? (
              <>
                <div className="head-title">
                  {auctionNotification
                    ? auctionNotification?.product?.name
                    : null}
                </div>
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
            <button
              className="flex flex-center justify-center br50"
              onClick={handleMuteButton}
              disabled={isMute}
            >
              <IconSpeaker />
            </button>
            <button
              className="flex flex-center justify-center br50"
              onClick={handleShareButton}
            >
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
          {winnerNotification ? (
            <div className="winner-profile flex flex-center">
              <div className="pf br50">
                <img src="/static/images/profile.png" alt="" />
              </div>
              winnerNotification?.name <span> &nbsp; is winner 🎉</span>
            </div>
          ) : null}
          {bidNotification ? (
            <div className="winner-profile flex flex-center">
              <div className="pf br50">
                <img src="/static/images/profile.png" alt="" />
              </div>
              {bidNotification?.customer?.firstName}{" "}
              <span> &nbsp; is winning 🎉</span>
            </div>
          ) : null}

          <div className="stream-footer flex flex-center space-between">
            <div className="left">
              <div className="time-left">
                Time left - <Timer minutes={minutes} seconds={seconds} />
              </div>
              <div className="bid-status flex flex-center">
                {winnerNotification?.bidAmount? <>
                  Current Bid - ${bidAmount} + Ship/Tax{" "}
                </> : <>Selling Bid - ${bidAmount} + Ship/Tax{" "}</>}
                <span
                  className="flex flex-center justify-center br50"
                  onClick={handleShipModal}
                >
                  i
                </span>
              </div>
            </div>
            {getAuctionArea()}
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

        {openShipPayDetails ? (
          <>
            <ShippingTaxesModal setOpenShipPayDetails={setOpenShipPayDetails} />
          </>
        ) : (
          <></>
        )}
        {isShareModalOpen ? (
          <>
            <ShareModalModal setIsShareModalOpen={setIsShareModalOpen} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
export default StreamingBase;
