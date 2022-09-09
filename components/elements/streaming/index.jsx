import React, {useEffect} from "react";
import Link from "next/link";
import LeftDiv from "./LeftDiv";
import RightDiv from "./RightDiv";
import CenterDiv from "./CenterDiv";
import { useState } from "react";

function Index() {
  return (
    <div className="wrapper">
      <LeftDiv />
      <CenterDiv />
      <RightDiv />
    </div>
  );
}

export default Index;
