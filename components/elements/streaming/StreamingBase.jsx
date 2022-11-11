import React, { useState, useEffect, useMemo, memo } from "react";
import StreamingElement from "./StreamingElement";
import Timer from "./Timer";
import { createBid } from "../../../api/stream/createBid";
import { useSelector } from "react-redux";
import IconSpeaker from "../../Icons/IconSpeaker";
import IconShare from "../../Icons/IconShare";
import IconLikeWhite from "../../Icons/IconLikeWhite";
import IconAdd from "../../Icons/IconAdd";
import IconShops from "../../Icons/IconShops";
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
import { DefaultImagePath } from "../../Constants/defaultImage";
import { useRef } from "react";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";
import { ImageTransformation } from "../../Constants/imageTransformation";

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
  const [amountToBid, setAmountToBid] = useState(+bidAmount + 1);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [disableBid, setDisableBid] = useState(false);
  const [isBidResponseModal, setIsBidResponseModal] = useState(false);
  /*****For notifications *****/

  const [volumeLevel, setVolumeLevel] = useState(100);
  const [isMute, setIsMute] = useState(false);
  const [openShipPayDetails, setOpenShipPayDetails] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // const streamNotification = streamNotification;

  const [auctionId, setAuctionId] = useState(null);
  const router = useRouter();
  const uuid = router.query["uuid"];
  const [liked, setLiked] = useState(
    stream?.streamData?.isLike ? stream?.streamData?.isLike : false
  );
  const [onPageLanding, setOnPageLanding] = useState(true);
  const [currentAuctionDetails, setCurrentAuctionDetails] = useState(null);

  const { isMobile } = useIsMobile();

  const myInterval = useRef(null);

  const stopTimer = useRef(false);

  /**
   * This useEffect will start countdown till 0
   */
  useEffect(() => {
    function handleTimer() {
      myInterval.current = setInterval(() => {
        if (seconds > 0) {
          setOnPageLanding(false);
          setSeconds(seconds - 1);
        }
        if (seconds === 0 && minutes !== 0 && seconds < 60) {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }, 1000);
    }

    if (minutes !== null && seconds !== null && !stopTimer.current) {
      handleTimer();

      if (seconds <= 0 && minutes <= 0) {
        setMinutes(0);
        setSeconds(0);
        setBidAmount(null);

        setDisableBid(true);
        setCurrentAuctionDetails(null);
        if (!stopTimer.current) {
          stopTimer.current = true;
        }
        clearInterval(myInterval.current);
      }
    }

    return () => {
      clearInterval(myInterval.current);
    };
  }, [minutes, seconds, stopTimer.current]);

  /**
   * Will Subscribe to all Notofication type channels
   */

  useEffect(() => {
    if (streamNotification) {
      if (streamNotification?.product?.name !== currentAuctionDetails?.name) {
        setCurrentAuctionDetails(streamNotification?.product);
      } else {
        setCurrentAuctionDetails(null);
      }

      if (streamNotification?.name) {
        setBidAmount(null);
        if (!stopTimer.current) {
          stopTimer.current = true;
        }
      } else {
        if (stopTimer.current) {
          stopTimer.current = false;
          setDisableBid(false);
        }
      }
    }
  }, [streamNotification]);

  useEffect(() => {
    if (stream?.streamPageData?.streamPageDteails?.isLoggedIn) {
      setDisableBid(false);
    }
  }, [stream]);

  /**
   * This useEffect will calculate time and set bid amount on changes of notification
   */
  useEffect(() => {
    if (!!streamNotification || liveAuctionDetails?.latestAuction !== {}) {
      getTimeDifference(getTime, getCurrentTime);
      if (
        !!streamNotification?.auction?.id ||
        !!streamNotification?.auctionId ||
        !!liveAuctionDetails?.latestAuction?.auctionId
      ) {
        setAuctionId(getAuctionId);
      }
      if (
        streamNotification ||
        liveAuctionDetails?.latestBidding?.bidAmount ||
        liveAuctionDetails?.latestAuction?.bidAmount
      ) {
        const amount =
          getBidAmount && (!stopTimer.current || getBidAmount > 1)
            ? getBidAmount
            : 0;

        setBidAmount(+amount);
        setAmountToBid(+amount + 1);
      }
    }
  }, [streamNotification, liveAuctionDetails]);

  const getTime = useMemo(() => {
    return (
      streamNotification?.endTime ||
      streamNotification?.auction?.endTime ||
      liveAuctionDetails?.latestAuction?.endTime ||
      null
    );
  }, [liveAuctionDetails, streamNotification]);

  const getCurrentTime = useMemo(() => {
    return (
      streamNotification?.currentTime ||
      streamNotification?.auction?.currentTime ||
      liveAuctionDetails?.latestAuction?.currentTime ||
      null
    );
  }, [liveAuctionDetails, streamNotification]);

  const getAuctionId = useMemo(() => {
    return (
      streamNotification?.auction?.id ||
      streamNotification?.auctionId ||
      liveAuctionDetails?.latestAuction?.auctionId ||
      null
    );
  }, [liveAuctionDetails, streamNotification]);

  const getBidAmount = useMemo(() => {
    const data =
      streamNotification?.bidAmount ||
      streamNotification?.auction?.bidAmount ||
      liveAuctionDetails?.latestBidding?.bidAmount ||
      liveAuctionDetails?.latestAuction?.bidAmount ||
      0;
    return data;
  }, [
    liveAuctionDetails?.latestAuction?.bidAmount,
    liveAuctionDetails?.latestBidding?.bidAmount,
    streamNotification,
  ]);

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
        } else {
          setDisableBid(false);
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
        {!minutes && !seconds ? (
          !onPageLanding ? (
            <div className="auction-end">
              <button className="primary-btn disable">Auction Ended</button>
            </div>
          ) : null
        ) : (
          !streamNotification?.name && (
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
                className={`primary-btn ${disableBid && "disable-opacity"}`}
                disabled={disableBid}
                onClick={(e) => {
                  e.preventDefault();
                  handleConfirmBid();
                }}
              >
                Bid US ${amountToBid}
              </button>
            </div>
          )
        )}
      </>
    );
  }, [minutes, seconds, amountToBid, disableBid]);

  /**
   * Method to identify name of stream
   * @returns string || null
   */
  const currentAuctionDetail = useMemo(() => {
    return (
      currentAuctionDetails ||
      streamNotification?.product ||
      liveAuctionDetails?.latestAuction
    );
  }, [liveAuctionDetails, streamNotification, currentAuctionDetails]);

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

  const renderUserAvatar = (profile) => {
    return (
      <>
        {profile?.avatar ? (
          <CloudinaryImage
            imageUrl={`${profile?.avatar || `logo/user-fill.png`}`}
            keyId={`${profile?.avatar || "avatar"}`}
            alternative={profile?.firstName?.[0] || "P"}
            transformation={ImageTransformation.profileImageCard}
          />
        ) : (
          <img src={DefaultImagePath.defaultProfileImage} alt="" />
        )}
      </>
    );
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
          <div className="head-title">
            {currentAuctionDetail?.name ||
              currentAuctionDetail?.productName ||
              ""}
            <p className="text-light">
              {currentAuctionDetail?.description ||
                currentAuctionDetail?.productDescription ||
                ""}
            </p>
          </div>
          {!stream?.streamPageData?.streamPageDteails?.isLoggedIn && (
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
        {streamNotification?.name ? (
          <div className="winner-profile flex flex-center">
            <div className="pf br50">
              {renderUserAvatar(streamNotification?.customer)}
            </div>
            {streamNotification?.name} <span> &nbsp; is winner 🎉</span>
          </div>
        ) : streamNotification?.customer?.firstName ? (
          <div className="winner-profile flex flex-center">
            <div className="pf br50">
              {renderUserAvatar(streamNotification?.customer)}
            </div>
            {streamNotification?.customer?.username}
            <span> &nbsp; is winning 🎉</span>
          </div>
        ) : null}
        {/* do not remove {minutes && seconds &&} */}
        <div className="stream-footer flex flex-center space-between">
          <div className="left">
            <div className="time-left">
              {(minutes > 0 || seconds > 0) && !stopTimer.current ? (
                <>
                  Time left - <Timer minutes={minutes} seconds={seconds} />
                </>
              ) : null}
            </div>
            <div className="bid-status flex flex-center">
              {streamNotification?.bidAmount ? (
                <>Selling Bid - ${streamNotification?.bidAmount} + Ship/Tax </>
              ) : (
                <>
                  Current Bid - $
                  {bidAmount > 0 && !stopTimer.current ? bidAmount : null} +
                  Ship/Tax
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
