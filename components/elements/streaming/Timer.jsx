import React, { useEffect, useState } from "react";

function Timer() {
  const [timer, setTimer] = useState("00:00");
  useEffect(() => {
    var minutes = 1;
    var seconds = 10;
    const updateTime = () => {
      if (minutes >= 0) {
        if (seconds >= 0 && seconds < 60) {
          seconds = seconds - 1;
         
          if (seconds === -1) {
            minutes = minutes - 1;
            seconds = 59;
            if(minutes== -1 && seconds==59){
                return "00:00"
            }
          }
        }
        return minutes + ":" + seconds;
      }
    };
    setInterval(() => {
      setTimer(updateTime);
    }, 1000);
  }, []);
  return (
    <div className="timer">
      <h2>{timer}</h2>
    </div>
  );
}

export default Timer;
