import React, { useState, useEffect, memo, useMemo } from "react";
import StreamingElement from "./StreamingElement";
import Timer from "./Timer";
import { createBid } from "../../../api/stream/createBid";
import { useSelector } from "react-redux";
import IconSpeaker from "../../Icons/IconSpeaker";
import IconShare from "../../Icons/IconShare";
import IconLikeWhite from "../../Icons/IconLikeWhite";
import IconAdd from "../../Icons/IconAdd";
import IconEye from "../../Icons/IconEye";
import IconShops from "../../Icons/IconShops";
import LeftDiv from "./LeftDiv";
import {
  CustomBidModal,
  ShippingTaxesModal,
  ShareModalModal,
  BidCreatedModal,
} from "../../partials/Modal/Modal";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { streamLikeDislike } from "../../../api/stream/streams_api";
import IconSpeakerMute from "../../Icons/IconSpeakerMute";
import { useIsMobile } from "../../../contexts/Devices/CurrentDevices";

function StreamingBase({
  cardDetail,
  addressList,
  openPayment,
  handleLeftDiv,
  setIsBuyNowPaymentModal,
  setShowLoginModal,
  userCount,
  streamNotification,
  liveAuctionDetails,
}) {
  const stream = useSelector((state) => state.stream);
  const [open, setOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState(null);
  const [amountToBid, setAmountToBid] = useState(+bidAmount + 2);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [disableBid, setDisableBid] = useState(false);
  const [isBidResponseModal, setIsBidResponseModal] = useState(false);
  /*****For notifications *****/

  const [volumeLevel, setVolumeLevel] = useState(100);
  const [isMute, setIsMute] = useState(false);
  const [openShipPayDetails, setOpenShipPayDetails] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [auctionNotification, setAuctionNotification] = useState(null);
  const [bidNotification, setBidNotification] = useState(null);
  const [winnerNotification, setWinnerNotification] = useState(null);
  const [auctionId, setAuctionId] = useState(null);
  const router = useRouter();
  const uuid = router.query["uuid"];
  const [liked, setLiked] = useState(
    stream?.streamData?.isLike ? stream?.streamData?.isLike : false
  );
  const [onPageLanding, setOnPageLanding] = useState(true);
  const [currentAuctionName, setCurrentAuctionName] = useState(null);

  const { isMobile } = useIsMobile();

  /**
   * Will Subscribe to all Notofication type channels
   */
  useEffect(() => {
    setAuctionNotification(streamNotification?.auction);
    setBidNotification(streamNotification?.bid);
    // setAuctionId(
    //   streamNotification?.bid?.auctionId ??
    //     streamNotification?.auction?.auction?.id
    // );
    setWinnerNotification(streamNotification?.win);
    if (!!streamNotification?.auction) {
      setCurrentAuctionName(streamNotification?.auction?.product?.name);
    }
    if (!!streamNotification?.win) {
      setCurrentAuctionName(null);
    }
  }, [streamNotification]);

  useEffect(() => {
    setBidAmount(null);
  }, [winnerNotification]);

  /**
   * This useEffect will calculate time and set bid amount on changes of notification
   */
  useEffect(() => {
    if (
      !!auctionNotification ||
      !!bidNotification ||
      liveAuctionDetails?.latestAuction !== {}
    ) {
      getTimeDifference(getTime, getCurrentTime);
      if (stream?.streamPageData?.streamPageDteails?.isLoggedIn) {
        setDisableBid(false);
      }
      if (
        !!auctionNotification?.auction?.id ||
        !!bidNotification?.auctionId ||
        !!liveAuctionDetails?.latestAuction?.auctionId
      ) {
        setAuctionId(getAuctionId);
      }
      if (
        bidNotification ||
        auctionNotification ||
        liveAuctionDetails?.latestBidding !== {} ||
        liveAuctionDetails.latestAuction !== {}
      ) {
        const amount =
          (getBidAmount && minutes && seconds && getBidAmount) || 0;
        setBidAmount(+amount);
        setAmountToBid(+amount + 1);
      }
    }
  }, [bidNotification, auctionNotification, liveAuctionDetails, stream]);

  const getTime = useMemo(() => {
    return bidNotification?.endTime
      ? bidNotification?.endTime
      : auctionNotification?.auction?.endTime
      ? auctionNotification?.auction?.endTime
      : liveAuctionDetails?.latestAuction?.endTime
      ? liveAuctionDetails?.latestAuction?.endTime
      : null;
  }, [liveAuctionDetails, auctionNotification, bidNotification]);

  const getCurrentTime = useMemo(() => {
    return bidNotification?.currentTime
      ? bidNotification?.currentTime
      : auctionNotification?.auction?.currentTime
      ? auctionNotification?.auction?.currentTime
      : liveAuctionDetails?.latestAuction?.currentTime
      ? liveAuctionDetails?.latestAuction?.currentTime
      : null;
  }, [liveAuctionDetails, auctionNotification, bidNotification]);

  const getAuctionId = useMemo(() => {
    return auctionNotification?.auction?.id
      ? auctionNotification?.auction?.id
      : bidNotification?.auctionId
      ? bidNotification?.auctionId
      : liveAuctionDetails?.latestAuction?.auctionId
      ? liveAuctionDetails?.latestAuction?.auctionId
      : null;
  }, [liveAuctionDetails, auctionNotification, bidNotification]);

  const getBidAmount = useMemo(() => {
    const data = bidNotification?.bidAmount
      ? bidNotification?.bidAmount
      : auctionNotification?.auction?.bidAmount
      ? auctionNotification?.auction?.bidAmount
      : liveAuctionDetails?.latestBidding?.bidAmount
      ? liveAuctionDetails?.latestBidding?.bidAmount
      : liveAuctionDetails?.latestAuction?.bidAmount
      ? liveAuctionDetails?.latestAuction?.bidAmount
      : 0;
    return data;
  }, [liveAuctionDetails, auctionNotification, bidNotification]);

  /**
   * Method will calculate Live Auction endtime
   * @param {*} endTime
   */

  const getTimeDifference = (endTime, currentTime) => {
    if (endTime) {
      let [date, time] = endTime.split(" ");
      const convertedEndTime = moment(date.replaceAll("-", "/") + " " + time);
      const duration = moment.duration(convertedEndTime.diff(currentTime));

      let minutes = Math.floor(duration.asSeconds() / 60);
      let seconds = Math.ceil(duration.asSeconds() % 60);
      minutes = minutes < 0 ? 0 : minutes;
      seconds = seconds < 0 ? 0 : seconds;
      setMinutes(minutes);
      setSeconds(seconds);
    }
  };

  /**
   * Method will Handle bid confirmation event
   */
  const handleConfirmBid = async () => {
    if (!!cardDetail && !!addressList) {
      if (amountToBid > bidAmount) {
        setDisableBid(true);
        setOpen(false);
        const res = await createBid(
          Number(auctionId),
          Number(stream?.streamPageData.streamPageDteails.loggedInUserId),
          Number(amountToBid)
        );
        if (res?.status === 200) {
          setDisableBid(false);
          increaseBidAmount();
          setIsBidResponseModal(!isBidResponseModal);
        }
      }
    } else {
      openPayment(true);
    }
  };

  /**
   * Method will handle mute and untmute of stream
   */
  const handleMuteButton = (e) => {
    e.preventDefault();
    if (e.target.id !== "vol") {
      setIsMute(!isMute);
    }
  };

  /**
   * Opens custom bid modal
   */
  const handleCustomBid = () => {
    if (!!cardDetail && !!addressList) {
      setOpen(true);
    } else {
      openPayment(true);
    }
  };

  /**
   * Opens sahre bid modal
   */
  const handleShareButton = () => {
    setIsShareModalOpen(true);
  };

  /**
   * This useEffect will start countdown till 0
   */
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds < 0 && minutes < 0) {
        setMinutes(0);
        setSeconds(0);
        setBidAmount(null);
      }
      if (seconds > 0) {
        setOnPageLanding(false);
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setBidAmount(null);
          clearInterval(myInterval);
          setDisableBid(true);
          setCurrentAuctionName(null);
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

  /**
   * Adjust volume of Stream
   * @param {*} event
   */
  const changeVolumeLevel = (event) => {
    event.preventDefault();
    const changedVolume = event?.target?.value;
    if (changedVolume) {
      setVolumeLevel(changedVolume);
    }
  };

  /**
   * Method will set bidding amount
   */
  const checkBidAmount = () => {
    if (amountToBid > bidAmount) setAmountToBid(+amountToBid - 1);
  };

  /**
   * Method to increase bid amount by 1
   */
  const increaseBidAmount = () => {
    setAmountToBid(+amountToBid + 1);
  };

  /**
   * Method to open shipping modal
   */
  const handleShipModal = () => {
    setIsBuyNowPaymentModal(false);
    setOpenShipPayDetails(true);
  };

  /**
   * Method will return AUction area on stream
   * @returns JSX
   */
  const getAuctionArea = useMemo(() => {
    return (
      <>
        {minutes == 0 && seconds == 0 ? (
          !onPageLanding ? (
            <div className="auction-end">
              <button className="primary-btn disable">Auction Ended</button>
            </div>
          ) : null
        ) : (
          <div className="btn-wrap flex space-between">
            <button
              className={
                disableBid ? "border-btn disable-opacity" : "border-btn"
              }
              disabled={disableBid}
              onClick={(e) => {
                e.preventDefault();
                handleCustomBid();
              }}
            >
              Custom Bid
            </button>
            <button
              className={
                disableBid ? "primary-btn disable-opacity" : "primary-btn"
              }
              disabled={disableBid}
              onClick={(e) => {
                e.preventDefault();
                handleConfirmBid();
              }}
            >
              Bid US ${amountToBid}
            </button>
          </div>
        )}
      </>
    );
  }, [minutes, seconds, amountToBid, disableBid]);

  /**
   * Method to identify name of stream
   * @returns string || null
   */
  const liveAuctionName = useMemo(() => {
    if (stream?.streamProducts?.AuctionDetails) {
      return (
        stream?.streamProducts?.AuctionDetails?.latestAuction?.productName ??
        null
      );
    }
    return auctionNotification?.product?.name ?? currentAuctionName;
  }, [stream, auctionNotification, currentAuctionName]);

  const handleLikeUnlike = async () => {
    if (stream?.streamPageData?.streamPageDteails?.isLoggedIn) {
      const data = {
        stream_id: uuid,
        user_id: stream?.streamPageData?.streamPageDteails?.loggedInUserId,
      };
      const response = await streamLikeDislike(data);
      if (response.status) {
        setLiked(!liked);
      }
    } else {
      setShowLoginModal(true);
    }
  };
  const getlikeClass = useMemo(() => {
    if (liked) {
      return "like flex flex-center justify-center br50 liked";
    }
    return "like flex flex-center justify-center br50";
  }, [liked]);

  const handleDollarClick = () => {
    if (stream?.streamPageData?.streamPageDteails?.isLoggedIn) {
      setIsBuyNowPaymentModal(false);
      openPayment(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="stream-wrapper">
      <div className="overlay-sighin"></div>
      <div className="stream-image-video">
        {/* <img src="/static/images/stream-image.jpg" alt="stream" /> */}
        <StreamingElement volume={volumeLevel} isMute={isMute} />
      </div>
      <div className="inner-wrapper">
        <div className="stream-header flex space-between">
          {stream?.streamPageData?.streamPageDteails?.isLoggedIn ? (
            <div className="head-title">{liveAuctionName}</div>
          ) : (
            <div className="head-title">
              {stream?.streamPageData?.streamPageDteails &&
                `Please login to participate`}
            </div>
          )}
          <div className="tme-wrap flex flex-center justify-center live">
            <span>{userCount}</span> <button className="live"></button>
          </div>
          {/* <div className="tme-wrap end flex flex-center justify-center"><span>1.2K</span></div> */}
        </div>
        <div className="video-icon">
          {isMobile ? (
            <button
              className="flex flex-center justify-center br50 shops"
              onClick={(e) => {
                e.stopPropagation();
                handleLeftDiv(true);
              }}
            >
              <IconShops />
            </button>
          ) : (
            ""
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleMuteButton(e);
            }}
            className="flex flex-center justify-center br50 valum "
            id="mute"
          >
            {isMute ? <IconSpeakerMute /> : <IconSpeaker />}
            <span className="range flex flex-center">
              <input
                type="range"
                id="vol"
                name="vol"
                min="0"
                max="100"
                onChange={(e) => changeVolumeLevel(e)}
                value={volumeLevel}
                className="slider"
              />
            </span>
          </button>
          {/* <button
              className="flex flex-center justify-center br50"
              disabled={isMute}
            >
              <IconSpeaker />
            </button> */}
          <button
            className="flex flex-center justify-center br50"
            onClick={(e) => {
              e.preventDefault();
              handleShareButton();
            }}
          >
            <IconShare />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLikeUnlike();
            }}
            className={getlikeClass}
          >
            <IconLikeWhite />
          </button>
          <button
            className="flex flex-center justify-center br50"
            onClick={(e) => {
              e.preventDefault();
              handleDollarClick();
            }}
          >
            <IconAdd />
          </button>
        </div>
        {winnerNotification ? (
          <div className="winner-profile flex flex-center">
            <div className="pf br50">
              <img src="/static/images/profile.png" alt="" />
            </div>
            {winnerNotification?.name} <span> &nbsp; is winner 🎉</span>
          </div>
        ) : bidNotification ? (
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
              {(minutes !== 0 || seconds !== 0) && (
                <>
                  Time left - <Timer minutes={minutes} seconds={seconds} />
                </>
              )}
            </div>
            <div className="bid-status flex flex-center">
              {winnerNotification?.bidAmount ? (
                <>Selling Bid - ${winnerNotification?.bidAmount} + Ship/Tax </>
              ) : (
                <>
                  Current Bid - ${bidAmount > 0 ? bidAmount : null} + Ship/Tax{" "}
                </>
              )}
              <span
                className="flex flex-center justify-center br50"
                onClick={(e) => {
                  e.preventDefault();
                  handleShipModal();
                }}
              >
                i
              </span>
            </div>
          </div>
          {getAuctionArea}
        </div>
      </div>

      {open && (
        <CustomBidModal
          setOpen={setOpen}
          minutes={minutes}
          seconds={seconds}
          bidAmount={bidAmount}
          increaseBidAmount={increaseBidAmount}
          amountToBid={amountToBid}
          handleConfirmBid={handleConfirmBid}
          checkBidAmount={checkBidAmount}
          setAmountToBid={setAmountToBid}
        />
      )}

      {openShipPayDetails && (
        <ShippingTaxesModal setOpenShipPayDetails={setOpenShipPayDetails} />
      )}
      {isShareModalOpen && (
        <ShareModalModal setIsShareModalOpen={setIsShareModalOpen} />
      )}
      {isBidResponseModal && (
        <BidCreatedModal setIsBidResponseModal={setIsBidResponseModal} />
      )}
    </div>
  );
}
export default memo(StreamingBase);
