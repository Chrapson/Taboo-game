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
      return <span className={styles.counterMessage}>Time's up!</span>;
    } else {
      return (
        <span className={styles.counter}>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  return <Countdown date={Date.now() + roundTime * 1000} renderer={renderer} />;
});

export default MyCountdown;
