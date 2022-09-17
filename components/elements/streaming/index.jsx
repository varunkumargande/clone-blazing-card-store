import React, { useEffect, useState } from "react";
import LeftDiv from "./LeftDiv";
import RightDiv from "./RightDiv";
import CenterDiv from "./CenterDiv";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { streamData } from "../../../store/stream/action";
import StreamingElement from "./StreamingElement";


function Index() {
  const [open, setOpen] = useState(false);
  const [addShippInfo, setAddShippInfo] = useState(false);
  const [addPayInfo, setAddPayInfo] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const router = useRouter();
  const uuid = router.query["uuid"];
  const dispatch = useDispatch();
  const streamingDetails = useSelector((state) => {
    return state?.stream?.streamData
  });

  useEffect(() => {
    dispatch(streamData(uuid));
  }, []);


  return (
    <>
      {streamingDetails?.uuid ? (
        <>
          <div className="wrapper">
            <LeftDiv
              open={open}
              setOpen={setOpen}
              addShippInfo={addShippInfo}
              addPayInfo={addPayInfo}
              setCustomerId={setCustomerId}
              streamingDetails={streamingDetails}
            />
            <CenterDiv
              open={open}
              setOpen={setOpen}
              setAddShippInfo={setAddShippInfo}
              setAddPayInfo={setAddPayInfo}
              customerId={customerId}
              streamingDetails={streamingDetails}
            />
            <RightDiv streamingDetails={streamingDetails} />
          </div>
        </>
      ) : null}
    </>
  );
}

export default Index;
