import React, { memo, useEffect, useState } from "react";
import LeftDiv from "./LeftDiv";
import RightDiv from "./RightDiv";
import CenterDiv from "./CenterDiv";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { clearState, streamData } from "../../../store/stream/action";
import { notificationBaseUrl } from "../../../api/url";
import useLiveUserCount from "../../CustomHooks/LiveUserCounts";
import useEventSocket from "../../../hooks/useEventSocket";
import { useCallback } from "react";
import { useIsMobile } from "../../../contexts/Devices/CurrentDevices";
import { SignUPGoogle } from "../../partials/Modal/Modal";

function Index() {
  const { isMobile } = useIsMobile();

  const [open, setOpen] = useState(false);
  const [addShippInfo, setAddShippInfo] = useState(false);
  const [addPayInfo, setAddPayInfo] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [selectedStream, setSelectedStream] = useState();
  const router = useRouter();
  const uuid = router.query["uuid"];
  const [openPayment, setOpenPayment] = useState(false);
  const [productDetail, setProductDetail] = useState([]);
  const dispatch = useDispatch();
  const [isBuyNowPaymentModal, setIsBuyNowPaymentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [liveAuctionDetails, setLiveAuctionDetails] = useState({});
  // const [userCount, setUserCount] = useState(null);
  const [channel, setChannel] = useState(null);

  const stream = useSelector((state) => {
    return state?.stream;
  });
  const streamingDetails = stream?.streamData;
  const streamPageData = stream?.streamPageData;
  const { count, client } = useLiveUserCount(streamPageData, setChannel);
  const [isLeftDivOpen, setLeftDivOpen] = useState();
  const [fetch, setFetch] = useState(false);

  const bid = useEventSocket(`${notificationBaseUrl}${uuid}-bid`, fetch);
  const auction = useEventSocket(
    `${notificationBaseUrl}${uuid}-auction`,
    fetch
  );
  const win = useEventSocket(`${notificationBaseUrl}${uuid}-win`, fetch);

  useEffect(() => {
    setFetch(true);
    dispatch(streamData(uuid));

    return () => {
      dispatch(clearState());
    };
  }, []);

  //Method to show and hide left div
  const handleLeftDiv = useCallback((toggle) => {
    setLeftDivOpen(toggle);
  }, []);

  const notificationData = {
    bid: bid?.data,
    auction: auction?.data,
    win: win?.data,
  };

  return (
    <>
      {streamingDetails?.uuid ? (
        <>
          {showLoginModal && (
            <SignUPGoogle
              customMsg={"Signup to Join Blazing Cards"}
              onDismiss={(e) => {
                e.preventDefault();
                setShowLoginModal(false);
              }}
            />
          )}
          <div
            className="streaming-page flex space-between"
            onClick={(e) => {
              e.preventDefault();
              isMobile && handleLeftDiv(false);
            }}
          >
            <LeftDiv
              setShowLoginModal={setShowLoginModal}
              auctionNotification={auction?.data}
              open={open}
              productDetail={setProductDetail}
              openPayment={setOpenPayment}
              setOpen={setOpen}
              addShippInfo={addShippInfo}
              addPayInfo={addPayInfo}
              setCustomerId={setCustomerId}
              streamingDetails={streamingDetails}
              handleLeftDiv={handleLeftDiv}
              isLeftDivOpen={isLeftDivOpen}
              setIsBuyNowPaymentModal={setIsBuyNowPaymentModal}
              auctionCallBack={setLiveAuctionDetails}
            />
            <CenterDiv
              open={open}
              productDetail={productDetail}
              isPayment={openPayment}
              openPayment={setOpenPayment}
              setOpen={setOpen}
              setAddShippInfo={setAddShippInfo}
              setAddPayInfo={setAddPayInfo}
              customerId={customerId}
              streamDetails={selectedStream}
              streamingDetails={streamingDetails}
              handleLeftDiv={handleLeftDiv}
              setIsBuyNowPaymentModal={setIsBuyNowPaymentModal}
              isBuyNowPaymentModal={isBuyNowPaymentModal}
              setShowLoginModal={setShowLoginModal}
              userCount={count}
              streamNotification={notificationData}
              liveAuctionDetails={liveAuctionDetails}
            />
            <RightDiv
              streamingDetails={streamingDetails}
              streamData={streamPageData}
              channel={channel}
              client={client}
            />
          </div>
        </>
      ) : null}
    </>
  );
}

export default memo(Index);
