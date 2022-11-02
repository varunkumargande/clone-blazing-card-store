import React, { useEffect, useRef, useState } from "react";
import LeftDiv from "./LeftDiv";
import RightDiv from "./RightDiv";
import CenterDiv from "./CenterDiv";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  clearState,
  streamData,
} from "../../../store/stream/action";
import { io } from "socket.io-client";
import { notificationBaseUrl } from "../../../api/url";
import DynamicModal from "../../CommonComponents/ModalWithDynamicTitle";
import useLiveUserCount from "../../CustomHooks/LiveUserCounts";
import useEventSocket from "../../../hooks/useEventSocket";

function Index() {
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
  // const [userCount, setUserCount] = useState(null);
  const [channel, setChannel] = useState(null);

  const stream = useSelector((state) => {
    return state?.stream;
  });
  const streamingDetails = stream?.streamData;
  const streamPageData = stream?.streamPageData;
  const { count, client } = useLiveUserCount(streamPageData, setChannel);
  const [isLeftDivOpen, setLeftDivOpen] = useState();
  const [login, setLogin] = useState(false);

  const bid = useEventSocket(`${notificationBaseUrl}${uuid}-bid`, login);

  const auction = useEventSocket(
    `${notificationBaseUrl}${uuid}-auction`,
    login
  );

  const win = useEventSocket(`${notificationBaseUrl}${uuid}-win`, login);

  useEffect(() => {
    dispatch(streamData(uuid));

    return () => {
      dispatch(clearState());
    };
  }, []);
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = () => {
    setLogin(true);
    dispatch(
      addNotification({
        type: "bid",
        value: bid?.data,
      })
    );

    dispatch(
      addNotification({
        type: "auction",
        value: auction?.data,
      })
    );

    dispatch(
      addNotification({
        type: "win",
        value: win?.data,
      })
    );
  };

  //Method to show and hide left div
  const handleLeftDiv = (toggle) => {
    setLeftDivOpen(toggle);
  };

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
            <DynamicModal
              title="Signup to Join Blazing Cards"
              setShowModal={setShowLoginModal}
            />
          )}
          <div className="streaming-page flex space-between">
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

export default Index;
