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
  const [currentAuctionDetails, setCurrentAuctionDetails] = useState(null)
  const [bidNotification, setBidNotification] = useState(null);
  const stream = useSelector((state) => {
    return state?.stream;
  });

  const streamingDetails = stream?.streamData;
  const streamPageData = stream?.streamPageData;

  const [currentAuction, setCurrentAuction] = useState(null);

  console.log(currentAuction, 'curee')
  const getAuctioningItem = () => {

    let auctionItem;
    if(auctionNotification) {
      auctionItem = {
        id: auctionNotification?.auction?.id,
        uuid: auctionNotification?.auction?.uuid,
        productId: auctionNotification?.product?.productId,
        productTitle: auctionNotification?.product?.name,
        productDescription: auctionNotification?.product?.description
      }
    } else {
      auctionItem = {
        id: currentAuction?.id,
        uuid: currentAuction?.uuid,
        productId: currentAuction?.streamProductId,
        productTitle: '',
        productDescription: ''
      }
    }
    setRunningAuction(auctionItem)
    return auctionItem;
  }

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
    {console.log(bidNotification)}
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
              bidNotification={bidNotification}
              open={open}
              auctionNotification={auctionNotification}
              productDetail={productDetail}
              isPayment={openPayment}
              openPayment={setOpenPayment}
              setOpen={setOpen}
              setAddShippInfo={setAddShippInfo}
              setAddPayInfo={setAddPayInfo}
              customerId={customerId}
              streamDetails={selectedStream}
              currentAuctionDetails={currentAuctionDetails}
              winnerNotification={null}
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
