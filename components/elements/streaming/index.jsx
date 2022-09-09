import React, {useEffect} from "react";
import Link from "next/link";
import LeftDiv from "./LeftDiv";
import RightDiv from "./RightDiv";
import CenterDiv from "./CenterDiv";
import { useState } from "react";

function Index() {
  const [options, setOptions] = useState({});
  useEffect(() => {
    initiateObject();
  }, []);
  const initiateObject = () => {
    setOptions({
      appID: "cb08a368d17648e9ab2886e3d1100a5e",
      channel: "POKEMON",
      host: String(Math.floor(Math.random() * 232)),
      audience: String(Math.floor(Math.random() * 232)),
    });
  };
  return (
    <div className="wrapper">
      <LeftDiv />
      <CenterDiv options={options} />
      <RightDiv userType="audience"/>
    </div>
  );
}

export default Index;
