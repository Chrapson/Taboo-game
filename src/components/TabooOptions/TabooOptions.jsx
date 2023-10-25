import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import styles from "./TabooOptions.module.css";

const SettingsComponent = () => {
  const [language, setLanguage] = useState("pl");
  const [roundTime, setRoundTime] = useState(60);
  const [players, setPlayers] = useState(2);
  const [playersName, setPlayersName] = useState(Array(players).fill(""));

  const navigate = useNavigate();

  const handleStartGame = () => {
    const playersNameString = playersName.join(",");
    navigate(
      `/game?language=${language}&roundTime=${roundTime}&players=${players}&playersName=${playersNameString}`
    );
  };

  const handlePlayerNameChange = (index, newName) => {
    const updatedNames = [...playersName];
    updatedNames[index] = newName;
    setPlayersName(updatedNames);
  };

  const handlePlayersChange = (newPlayers) => {
    setPlayers(newPlayers);
    if (newPlayers > playersName.length) {
      setPlayersName((prevNames) => [
        ...prevNames,
        ...Array(newPlayers - prevNames.length).fill(""),
      ]);
    } else if (newPlayers < playersName.length) {
      setPlayersName((prevNames) => prevNames.slice(0, newPlayers));
    }
  };

  const validateSubmit = (e) => {
    e.preventDefault();
    if (players < 2) {
      toast.error("Minimum players is 2", {
        position: "top-center",
      });
    } else if (players > 10) {
      toast.error("Maximum players is 10", {
        position: "top-center",
      });
    } else if (playersName.some((name) => name.trim() === "")) {
      toast.error("Player names cannot be empty", {
        position: "top-center",
      });
    } else if (hasDuplicateNames(playersName)) {
      toast.error("Player names cannot be the same", {
        position: "top-center",
      });
    } else {
      handleStartGame();
    }
  };

  const hasDuplicateNames = (names) => {
    const uniqueNames = new Set(names.map((name) => name.trim().toLowerCase()));
    return uniqueNames.size !== names.length;
  };
  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={validateSubmit}>
        <div className={styles.languageOptions}>
          Select language:{" "}
          <select
            className={styles.languageSelect}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="pl">Polish</option>
          </select>
        </div>
        <div className={styles.roundOptions}>
          Select round time:{" "}
          <select
            className={styles.roundSelect}
            value={roundTime}
            onChange={(e) => setRoundTime(e.target.value)}
          >
            <option value="30">30s</option>
            <option value="45">45s</option>
            <option value="60">1m</option>
            <option value="90">1,5m</option>
            <option value="120">2m</option>
          </select>
        </div>
        <div className={styles.playersContainer}>
          <div className={styles.playersCountOptions}>
            Players:{" "}
            <input
              className={styles.playersCountInput}
              type="number"
              value={players}
              onChange={(e) => handlePlayersChange(e.target.value)}
            />
          </div>
          {playersName.slice(0, 10).map((playerName, index) => (
            <div className={styles.playerNameOptions} key={index}>
              Player {index + 1} name:{" "}
              <input
                className={styles.playerNameInput}
                placeholder="enter name"
                type="text"
                value={playerName}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <Toaster />
        <button className={styles.submitButton} type="submit">
          Start Game
        </button>
      </form>
    </div>
  );
};

export default SettingsComponent;
