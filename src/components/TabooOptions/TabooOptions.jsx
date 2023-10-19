import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsComponent = () => {
  const [language, setLanguage] = useState("pl");
  const [roundTime, setRoundTime] = useState(60);

  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate(`/game?language=${language}&roundTime=${roundTime}`);
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
      </div>

      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default SettingsComponent;
