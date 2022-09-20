import React, { useEffect } from "react";

function Timer(props) {
  const {minutes, seconds} = props;
  return (
    <div className="timer">
      <h2>{minutes}:{seconds}</h2>
    </div>
  );
}

export default Timer;
