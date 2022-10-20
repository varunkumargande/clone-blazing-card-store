import React, { useEffect, useRef, useState } from "react";
import LeftDiv from "./LeftDiv";
import RightDiv from "./RightDiv";
import CenterDiv from "./CenterDiv";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addNotification, clearState, streamData } from "../../../store/stream/action";
import { io } from "socket.io-client";
import { socketIO } from "../../../api/url";
import DynamicModal from "../../CommonComponents/ModalWithDynamicTitle";

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
  const [auctionNotification, setAuctionNotification] = useState(null);
  const [isBuyNowPaymentModal, setIsBuyNowPaymentModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const stream = useSelector((state) => {
    return state?.stream;
  });
  const streamNotification = useSelector(
    (state) => state.stream?.streamNotification
  );
  const streamingDetails = stream?.streamData;
  const streamPageData = stream?.streamPageData;
  const [isLeftDivOpen, setLeftDivOpen] = useState();

  useEffect(() => {
    dispatch(streamData(uuid));

    return () => {
      dispatch(clearState())
    }
  }, []);

  useEffect(() => {socketInitializer()}, []);

  const socketInitializer = () => {
    const socketObject = io(socketIO);
    socketObject.on(`${uuid}-bid`, (bid) => {
      dispatch(
        addNotification({
          type: "bid",
          value: bid,
        })
      );
    });
    socketObject.on(`${uuid}-auction`, (auction) => {
      dispatch(
        addNotification({
          type: "auction",
          value: auction,
        })
      );
    });
    socketObject.on(`${uuid}-win`, (winner) => {
      dispatch(
        addNotification({
          type: "win",
          value: winner,
        })
      );
    });
  };

  useEffect(() => {
    setAuctionNotification(streamNotification?.auction);
  }, [streamNotification]);

  //Method to show and hide left div
  const handleLeftDiv = (toggle) => {
    setLeftDivOpen(toggle);
  };

  return (
    <>
      {streamingDetails?.uuid ? (
        <>
          {showLoginModal && (<DynamicModal title="Signup to Join Blazing Cards" setShowModal={setShowLoginModal} />)}
          <div className="streaming-page flex space-between">
            <LeftDiv
              setShowLoginModal={setShowLoginModal}
              auctionNotification={auctionNotification}
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
            />
            <RightDiv
              streamingDetails={streamingDetails}
              streamData={streamPageData}
            />
          </div>
        </>
      ) : null}
    </>
  );
}

export default Index;
