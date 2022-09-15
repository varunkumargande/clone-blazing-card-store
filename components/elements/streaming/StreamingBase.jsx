import React, { useState, useEffect } from "react";
import { getToken } from "../../../api/stream/getToken";
import AgoraRTM from "agora-rtm-sdk";
import { useRouter } from "next/router";
import Timer from "./Timer";
import { createBid } from "../../../api/stream/createBid";

function StreamingBase() {
  const [open, setOpen] = React.useState(false);
  const [bidAmount, setBidAmount] = React.useState(25);
  const [amountToBid, setAmountToBid] = React.useState(bidAmount + 2);
  const [timer, setTimer] = useState({minutes: "00", seconds:"10"});
  console.log("timer+++++",timer)
  /*****For notifications *****/
  const router = useRouter();
  const hostId = router.query["hostId"];
  const audienceId = router.query["audienceId"];
  const [options, setoptions] = useState(null);
  const userType = hostId ? "host" : "audience";
  const [channel, setChannel] = useState(null);
  
  useEffect(() => {
    if (!options) {
      setoptions({
        appID: "eddb3849590747d989047b5b2e213c96",
        channel: "POKEMON",
        host: "HOST",
        audience: "guest" + audienceId,
      });
    }

    if (options) {
      console.log(joinChannel());
    }
  }, [options]);

  const joinChannel = async () => {
    const client = AgoraRTM.createInstance(options.appID);
    const token = await getToken("RTM",options.channel, options[userType],"userAccount","audience")
    console.log("===========",token);
    await client.login({ uid: options[userType], token });
    const channel = await client.createChannel(options.channel);
    await channel.join();
    console.log(setChannel(channel));
    console.log(channel)
    channel.on("Member Joined", function (memberId) {
      console.log(memberId + "JOined");
    });
    return channel;
  };
  useEffect(() => {
    if(channel){
      channel.on("ChannelMessage", function (message, memberId) {
        const {bidAmount,amountToBid} = JSON.parse(message.text);
        setBidAmount(bidAmount);
        setAmountToBid(amountToBid);
      });
    }
  }, [channel])
  const handleConfirmBid = async () => {
    let message;
    let {minutes, seconds} = timer;
    let auctionId=1;
    setOpen(false);
    createBid(auctionId, audienceId, amountToBid);
    setBidAmount(amountToBid);
    setAmountToBid(amountToBid + 2);
    if(seconds < 10){
      message = {bidAmount:amountToBid, amountToBid: amountToBid+2, lastMinutes: seconds};
    }else{
      message = {bidAmount:amountToBid, amountToBid: amountToBid+2};
    }
    message = JSON.stringify({bidAmount:amountToBid, amountToBid: amountToBid+2});
    await channel.sendMessage({ text: message, type: "text" });
  };
  /*****End notifications *****/
  const handleMuteButton = () => {};
  const handleCustomBid = () => {
    setOpen(true);
  };
  // function updateTimer(minutes,seconds){
  //   console.log("updtatesecond",seconds)
  //   if(minutes >=0){
  //     if(seconds>=0 && seconds<=59){
  //       seconds=seconds-1;
  //       if(seconds===-1){
  //         minutes=minutes-1
  //         seconds=59
  //       }
  //     }
  //   }
  //   let time={}
  //   time.upminutes=String(minutes);time.upseconds=String(seconds)
  //   return time
  // }

  // function startTimer(){
  //   // console.log(timer)
  //   const interval=setInterval(() => {
  //     setTimer((prevTimer) => {
  //       let {upminutes,upseconds} = updateTimer(prevTimer.minutes,prevTimer.seconds)
  //       if((upminutes==0 || upminutes=='00') && (upseconds==0 || upseconds=='0')){
  //         clearInterval(interval)
  //       }
  //       prevTimer.minutes=upminutes,
  //       prevTimer.seconds=upseconds
  //       return prevTimer;
  //     })
  //   },1000)
  // }
  
  // useEffect(() => {
  //  startTimer()
  // }, []);
  const updateTime = () => {
    let minutes =timer.minutes;
      let seconds =timer.seconds;
    if (minutes >= 0) {
      if (seconds >= 0 && seconds < 60) {
        seconds = seconds - 1;

        if (seconds === -1) {
          minutes = minutes - 1;
          seconds = 59;
          if (minutes == -1 && seconds == 59) {
            minutes="00"
            seconds="00"
            return {minutes,seconds}
          }
        }
      }
      
      return {minutes,seconds};
    }
  };
  useEffect(() => {
   const interval= setInterval(() => {
      let {minutes, seconds} =updateTime();
      console.log("-----------",minutes,seconds)
      setTimer({minutes: minutes, seconds:seconds});
      if(timer.minutes=="00" && timer.seconds == "00"){
        clearInterval(interval)
      }
    }, 1000);
  }, []);
  return (
    <>
      <span>38</span>
      <div className="stream-wrapper">
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
                value="50"
                className="volume-range"
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
            
            <Timer time={timer} />
          </div>
        </div>
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
              {/* <div className="timer">
                <h2>
                    00:00
                </h2>
              </div> */}
              <Timer time={timer} />
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
