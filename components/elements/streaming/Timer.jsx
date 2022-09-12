import React, { useEffect } from "react";

function Timer(props) {
  const {time} = props;
  return (
    <div className="timer">
      <h2>{time}</h2>
    </div>
  );
}

export default Timer;
