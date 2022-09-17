import React, { useEffect, useState } from "react";
import LeftDiv from "./LeftDiv";
import RightDiv from "./RightDiv";
import CenterDiv from "./CenterDiv";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { streamData } from "../../../store/stream/action";

function Index(){
    const [open, setOpen] = useState(false);
    const [addShippInfo, setAddShippInfo] = useState(false);
    const [addPayInfo, setAddPayInfo] = useState(false);
    const [customerId, setCustomerId] = useState("");
    const [selectedStream, setSelectedStream] = useState()
    const router = useRouter();
    const uuid = router.query["uuid"];
    const [openPayment, setOpenPayment] = useState(false);
    const [productDetail, setProductDetail] = useState([]);
    const dispatch = useDispatch();
  const streamingDetails = useSelector((state) => {
    return state?.stream?.streamData
  });
  
  useEffect(() => {
    dispatch(streamData(uuid));
  }, []);

    console.log(productDetail)

    return(
        <>
        { streamingDetails?.uuid ? <>
            <div className='wrapper'>
            <LeftDiv open={open} productDetail={setProductDetail} openPayment = {setOpenPayment} setOpen={setOpen} addShippInfo={addShippInfo} addPayInfo={addPayInfo} setCustomerId={setCustomerId} streamDetails={selectedStream}/>
            <CenterDiv open={open} productDetail={productDetail} isPayment={openPayment} openPayment = {setOpenPayment} setOpen={setOpen} setAddShippInfo={setAddShippInfo} setAddPayInfo={setAddPayInfo} customerId={customerId} streamDetails={selectedStream}/>
            <RightDiv streamingDetails={streamingDetails} />
        </div>
            </>  : null

        }
        </>
        
    )

}

export default Index;
