import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import styles from "./Countdown.module.css";
import { useLocation } from "react-router-dom";

const MyCountdown = React.memo(({ onPlayerChange }) => {
  const location = useLocation();

  const roundTime = parseInt(
    new URLSearchParams(location.search).get("roundTime") || "60"
  );

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <span>Time's up!</span>;
    } else {
      return (
        <span className={styles.counter}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  return (
    <div className={styles.countdownContainer}>
      <Countdown date={Date.now() + roundTime * 1000} renderer={renderer} />
    </div>
  );
});

export default MyCountdown;
