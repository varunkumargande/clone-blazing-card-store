import React, { useEffect } from "react";

function Timer(props) {
  console.log(props)
  const {minutes, seconds} = props.time;
  // console.log(minutes, seconds)
  return (
    <div className="timer">
      <h2>{minutes}:{seconds}</h2>
    </div>
  );
}

export default Timer;
