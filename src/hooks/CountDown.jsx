/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const CountDown = ({ initialMinute, initialSeconds }) => {
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? (
        <div>
          Không nhận được mã OTP <Button>Gửi lại mã</Button>
        </div>
      ) : (
        <h3>
          Thời gian còn lại {minutes}:{seconds < 10 ? `0${seconds}` : seconds}{" "}
          phút
        </h3>
      )}
    </div>
  );
};

export default CountDown;
