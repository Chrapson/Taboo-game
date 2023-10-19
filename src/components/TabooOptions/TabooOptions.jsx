import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      // Jeśli liczba graczy wzrosła, dodaj nowe pola do wpisywania imion
      setPlayersName((prevNames) => [
        ...prevNames,
        ...Array(newPlayers - prevNames.length).fill(""),
      ]);
    } else if (newPlayers < playersName.length) {
      setPlayersName((prevNames) => prevNames.slice(0, newPlayers));
    }
  };

  return (
    <div>
      <div>
        Select language:{" "}
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="pl">Polish</option>
        </select>
      </div>
      <div>
        Select round time:{" "}
        <select
          value={roundTime}
          onChange={(e) => setRoundTime(e.target.value)}
        >
          <option value="30">30s</option>
          <option value="45">45s</option>
          <option value="60">1m</option>
          <option value="90">1,5m</option>
          <option value="120">2m</option>
        </select>
        <div>
          Players:{" "}
          <input
            type="number"
            max="10"
            value={players}
            onChange={(e) => handlePlayersChange(e.target.value)}
          />
          {playersName.map((playersName, index) => (
            <div key={index}>
              Player {index + 1} name:{" "}
              <input
                type="text"
                value={playersName}
                onChange={(e) => handlePlayerNameChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default SettingsComponent;
