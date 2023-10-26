import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Taboo.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import MyCountdown from "../Countdown/Countdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Taboo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const language = new URLSearchParams(location.search).get("language") || "en";
  const gameMode =
    new URLSearchParams(location.search).get("gameMode") || "teamplay";
  console.log(gameMode);
  const players = parseInt(
    new URLSearchParams(location.search).get("players") || "2"
  );
  const playersName = new URLSearchParams(location.search).get("playersName");
  const playerNamesArray = playersName ? playersName.split(",") : [];

  const getRandomColor = () => {
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
      "aquamarine",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  const [gameState, setGameState] = useState({
    forbiddenWords: [],
    wordToGuess: "",
    difficulty: "",
    containerBackgroundColor: getRandomColor(),
  });
  const [myCountdownKey, setMyCountdownKey] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [round, setRound] = useState(1);
  const [playerPoints, setPlayerPoints] = useState(Array(players).fill(0));
  const [isLoading, setIsLoading] = useState(true);

  const getWords = async () => {
    try {
      const response = await axios.get(
        `https://www.taboocardsapi.com/api/cards/random?language=${language}`
      );
      console.log(response);
      setGameState({
        forbiddenWords: response.data.data.forbiddenWords,
        wordToGuess: response.data.data.title,
        difficulty: response.data.data.difficulty,
        containerBackgroundColor: getRandomColor(),
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const resetGame = () => {
    setRound(1);
    setPlayerPoints(Array(players).fill(0));
    setActivePlayer(0);
    setMyCountdownKey((key) => key + 1);
    getWords();
    console.log(myCountdownKey);
  };
  const navigateToOptions = () => {
    navigate("/");
  };
  const handleCorrectGuess = () => {
    const newPoints = [...playerPoints];
    newPoints[activePlayer] += 1;
    setPlayerPoints(newPoints);
    getWords();
  };

  const handleNextPlayer = () => {
    setActivePlayer((player) => (player + 1) % players);
    setMyCountdownKey((key) => key + 1);
    getWords();
  };
  useEffect(() => {
    if (activePlayer === players - 1) {
      setRound((round) => round + 1);
    }
  }, [activePlayer, players]);
  useEffect(() => {
    getWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <div className={styles.container}>
      <div className={styles.roundContainer}>
        <MyCountdown key={myCountdownKey} />
        <div className={styles.roundInfo}>{`Round ${round}`}</div>
      </div>
      <div className={styles.gameControllerButtonsContainer}>
        <button
          className={styles.button}
          onClick={() => {
            handleCorrectGuess();
          }}
        >
          V
        </button>
        <button className={styles.button} onClick={getWords}>
          SKIP
        </button>
        <button
          className={styles.button}
          onClick={() => {
            handleNextPlayer();
          }}
        >
          {gameMode === "teamplay" ? (
            <span>Next Team</span>
          ) : (
            <span>Next Player</span>
          )}
        </button>
      </div>
      <div className={styles.playerInfoContainer}>
        <div className={styles.activePlayer}>
          {gameMode === "teamplay" ? (
            <span>TEAM GUESSING: </span>
          ) : (
            <span>PLAYER GUESSING: </span>
          )}
          {playerNamesArray[activePlayer]}
        </div>
        <div>
          {playerNamesArray.map((name, index) => (
            <div key={index} className={styles.playerName}>
              {gameMode === "teamplay"
                ? `Team : ${name} score: ${playerPoints[index]}`
                : `PLAYER : ${name} score: ${playerPoints[index]}`}
            </div>
          ))}
        </div>
      </div>
      {!isLoading ? (
        <div
          className={styles.cardContainer}
          style={{ backgroundColor: gameState.containerBackgroundColor }}
        >
          <div className={styles.wordToGuessContainer}>
            {gameState.wordToGuess}
          </div>
          <div className={styles.forbiddenWordsContainer}>
            {gameState.forbiddenWords.map((word, index) => (
              <div key={index}>{word}</div>
            ))}
          </div>
          <div className={styles.difficultyContainer}>
            {gameState.difficulty}
          </div>
        </div>
      ) : (
        <div className={styles.skeletonWrapper}>
          <Skeleton className={styles.skeletonWordToGuess} />
          <Skeleton className={styles.skeletonForbiddenWords} />
          <Skeleton className={styles.skeletonDifficulty} />
        </div>
      )}
      <div className={styles.optionButtons}>
        <button className={styles.button} onClick={resetGame}>
          New Game
        </button>
        <button className={styles.button} onClick={navigateToOptions}>
          Back to menu
        </button>
      </div>
    </div>
  );
};

export default Taboo;
