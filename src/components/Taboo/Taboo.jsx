import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Taboo.module.css";
import { useLocation } from "react-router-dom";
import Countdown from "react-countdown";

const Taboo = () => {
  const [forbiddenWords, setForbiddenWords] = useState([]);
  const [wordToGuess, setWordToGuess] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [containerBackgroundColor, setContainerBackgroundColor] = useState(
    getRandomColor()
  );
  const [key, setKey] = useState(0);

  const location = useLocation();
  const language = new URLSearchParams(location.search).get("language") || "en";
  const roundTime = parseInt(
    new URLSearchParams(location.search).get("roundTime") || "60"
  );

  function getRandomColor() {
    const colors = [
      "red",
      "green",
      "blue",
      "orange",
      "purple",
      "orangered",
      "pink",
      "brown",
      "gray",
      "black",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const getWords = async () => {
    try {
      const response = await axios.get(
        `https://www.taboocardsapi.com/api/cards/random?language=${language}`
      );
      console.log(response);
      setForbiddenWords(response.data.data.forbiddenWords);
      setWordToGuess(response.data.data.title);
      setDifficulty(response.data.data.difficulty);
      setContainerBackgroundColor(getRandomColor());
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setKey((k) => k + 1);
    getWords();
  };

  useEffect(() => {
    getWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const renderer = ({ minutes, seconds, completed }) => {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    if (completed) {
      return <span className={styles.counterMessage}>Time's up!</span>;
    } else {
      return (
        <span className={styles.counter}>
          {formattedMinutes}:{formattedSeconds}
        </span>
      );
    }
  };

  return (
    <>
      <div key={key} className={styles.countdownContainer}>
        <Countdown date={Date.now() + roundTime * 1000} renderer={renderer} />
        <button onClick={handleClick}>Next Card</button>
      </div>
      <div
        className={`${styles.container} ${styles.customContainer}`}
        style={{ backgroundColor: containerBackgroundColor }}
      >
        <div className={styles.wordToGuessContainer}>{wordToGuess}</div>
        <div className={styles.forbiddenWordsContainer}>
          {forbiddenWords.map((word, index) => (
            <div key={index}>{word}</div>
          ))}
        </div>
        <div className={styles.difficultyContainer}>{difficulty}</div>
      </div>
    </>
  );
};

export default Taboo;
