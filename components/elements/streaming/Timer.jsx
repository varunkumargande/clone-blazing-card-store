import React, { useEffect } from "react";

function Timer(props) {
  const {minutes, seconds} = props;
  return (
    <>
      {minutes}m {seconds}s
    </>
  );
}

export default Timer;
