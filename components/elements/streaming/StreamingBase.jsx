import React, { useState, useEffect } from "react";
import StreamingElement from "./StreamingElement";
import Timer from "./Timer";
import { createBid } from "../../../api/stream/createBid";
import { useSelector } from "react-redux";
import IconSpeaker from "../../Icons/IconSpeaker";
import IconShare from "../../Icons/IconShare";
import IconHeart from "../../Icons/IconHeart";
import IconDoller from "../../Icons/IconDoller";
import IconEye from "../../Icons/IconEye";
import {
  CustomBidModal,
  ShippingTaxesModal,
  ShareModalModal,
} from "../../partials/Modal/Modal";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { streamLikeDislike } from "../../../api/stream/streams_api";
import IconSpeakerMute from "../../Icons/IconSpeakerMute";

function StreamingBase({
  cardDetail,
  addressList,
  openPayment,
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
  const [auctionId, setAuctionId] = useState(null)
  const router = useRouter();
  const uuid = router.query["uuid"];
  const [liked, setLiked] = useState(false);

  /**
   * Will Subscribe to all Notofication type channels
   */
  useEffect(() => {
    socketObject.on(`${uuid}-bid`, (bid) => {
      setBidNotification(bid);
      setAuctionNotification(null);
      setWinner(null)
    });
    socketObject.on(`${uuid}-auction`, (auction) => {
      setAuctionNotification(auction);
      setBidNotification(null);
      setAuctionId(auctionNotification?.auction.id)
      setWinner(null)
    });
    socketObject.on(`${uuid}-win`, (winner) => {
      setWinnerNotification(winner);
      setBidNotification(null);
      setAuctionNotification(null);
    });
  }, []);


/**
 * This useEffect will calculate time and set bid amount on changes of notification
 */
  useEffect(() => {
    if (!!auctionNotification || !!bidNotification) {
      getTimeDifference(auctionNotification?.auction?.endTime || bidNotification?.endTime)
      if (stream?.streamPageData?.streamPageDteails?.isLoggedIn) {
        setDisableBid(false);
      }
      if (bidNotification) {
        setBidAmount(bidNotification?.bidAmount);
      }
    } 
  }, [bidNotification, auctionNotification]);

  /**
   * Method will re-rednders on each stream api change
   */
  useEffect(() => {
    if(stream?.streamProducts?.AuctionDetails) {
      getTimeDifference(stream?.streamProducts?.AuctionDetails?.latestBidding?.bidEndTime ?? stream?.streamProducts?.AuctionDetails?.latestAuction?.endTime)
      setAuctionId(stream?.streamProducts?.AuctionDetails?.latestAuction?.auctionId)
    }
  }, [stream])


  /**
   * Method will calculate Live Auction endtime
   * @param {*} endTime 
   */
  const getTimeDifference = (endTime) => {
    let [date, time] = endTime.split(" ")
    const endTime = moment(date.replaceAll("-","/")+" "+time)
    const duration = moment.duration(
      endTime.diff(moment.utc().format("YYYY/MM/DD, HH:mm:ss"))
    );
    let minutes = Math.floor(duration.asSeconds() / 60);
    let seconds = Math.ceil(duration.asSeconds() % 60);
    minutes = minutes < 0? 0 : minutes;
    seconds = seconds < 0 ? 0 : seconds;  
    if( minutes && seconds) {
      setBidAmount(stream?.streamProducts?.AuctionDetails?.latestBidding?.bidAmount ?? stream?.streamProducts?.AuctionDetails?.latestAuction?.bidAmount)
    }
    setMinutes(minutes);
    setSeconds(seconds);
 }

 /**
  * Method will Handle bid confirmation event
  */
  const handleConfirmBid = async () => {
    if (cardDetail.length == 0 && addressList.length == 0) {
      openPayment(true);
    } else {
      setOpen(false);
      increaseBidAmount();
      createBid(
        auctionId,
        Number(stream?.streamPageData.streamPageDteails.loggedInUserId),
        amountToBid
      );
    }
  };

  /**
   * Method will handle mute and untmute of stream
   */
  const handleMuteButton = (e) => {
    e.preventDefault();
    if(e.target.id !== 'vol') {
      setIsMute(!isMute);
    }
  };

  /**
   * Opens custom bid modal
   */
  const handleCustomBid = () => {
    setOpen(true);
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
      if(seconds < 0 && minutes < 0) {
        setMinutes(0);
        setSeconds(0);
        setBidAmount(null)
      }
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setBidAmount(null)
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
    if (amountToBid > bidAmount) setAmountToBid(amountToBid - 1);
  };

  /**
   * Method to increase bid amount by 1
   */
  const increaseBidAmount = () => {
    setAmountToBid(amountToBid + 1);
  };

  /**
   * Method to open shipping modal
   */
  const handleShipModal = () => {
    setOpenShipPayDetails(true);
  };

  /**
   * Method will return AUction area on stream
   * @returns JSX
   */
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

  /**
   * Method to identify name of stream
   * @returns string || null
   */
  const liveAuctionName = () => {
    if(stream?.streamProducts?.AuctionDetails) {
      return stream?.streamProducts?.AuctionDetails?.latestAuction?.productName ?? null;
    }
    return auctionNotification?.product?.name ?? null;
  }

  const handleLikeUnlike = async () => {
    if (stream?.streamPageData?.streamPageDteails?.isLoggedIn) {
      const data = {
        stream_id : uuid,
        user_id : stream?.streamPageData?.streamPageDteails?.loggedInUserId
      }
      const response = await streamLikeDislike(data);
      console.log(response)

      if(response.status) {
        setLiked(!liked);
      }
    }    
  }
  const getlikeClass = () => {
    if(liked) {
      return "like flex flex-center justify-center br50 liked";
    }
    return "like flex flex-center justify-center br50";
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
          <div className="stream-header flex space-between">
            {stream?.streamPageData?.streamPageDteails?.isLoggedIn ? (
              <>
                <div className="head-title">
                  {liveAuctionName()}
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
          onClick={(e) => handleMuteButton(e)}
          className="flex flex-center justify-center br50 valum" id='mute'>
             {isMute ? <IconSpeakerMute /> : <IconSpeaker/>}
              <span className="range flex flex-center">
                  <input type="range" id="vol" name="vol" min="0" max="100"
                    onChange={(e)=> changeVolumeLevel(e)}
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
              onClick={handleShareButton}
            >
              <IconShare />
            </button>
            <button onClick={handleLikeUnlike} className={getlikeClass()}>
              <IconHeart />
            </button>
            <button className="flex flex-center justify-center br50">
              <IconDoller />
            </button>
          </div>
          {winnerNotification ? (
            <div className="winner-profile flex flex-center">
              <div className="pf br50">
                <img src="/static/images/profile.png" alt="" />
              </div>
              {winnerNotification?.name} <span> &nbsp; is winner 🎉</span>
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
                {winnerNotification?.bidAmount ? <>Selling Bid - ${winnerNotification?.bidAmount } + Ship/Tax{" "}</> : <>
                  Current Bid - ${bidAmount} + Ship/Tax{" "}
                </>}
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
