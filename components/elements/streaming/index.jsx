import React, { useEffect, useState } from "react";
import LeftDiv from "./LeftDiv";
import RightDiv from "./RightDiv";
import CenterDiv from "./CenterDiv";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { streamData } from "../../../store/stream/action";
import { io } from "socket.io-client";

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
  const [socketObject, setSocketObject] = useState(
    io("http://52.72.64.43:4000")
  );
  const [auctionNotification, setAuctionNotification] = useState(null);
  const [bidNotification, setBidNotification] = useState(null);
  const stream = useSelector((state) => {
    return state?.stream;
  });

  const streamingDetails = stream?.streamData;
  const streamPageData = stream?.streamPageData;

  const [currentAuction, setCurrentAuction] = useState(null);

  useEffect(() => {
    socketObject.on(`${uuid}-bid`, (bid) => {
      setBidNotification(bid);
    });
    socketObject.on(`${uuid}-auction`, (auction) => {
      setAuctionNotification(auction);
    });
    dispatch(streamData(uuid));
  }, []);

  return (
    <>
      {streamingDetails?.uuid ? (
        <>
          <div className="streaming-page flex space-between">
            <LeftDiv
              auctionNotification={auctionNotification}
              open={open}
              productDetail={setProductDetail}
              openPayment={setOpenPayment}
              setOpen={setOpen}
              addShippInfo={addShippInfo}
              addPayInfo={addPayInfo}
              setCustomerId={setCustomerId}
              streamingDetails={streamingDetails}
              setCurrentAuction={setCurrentAuction}
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
              currentAuction={currentAuction}
              streamingDetails={streamingDetails}
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
