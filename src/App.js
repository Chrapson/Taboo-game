import React from "react";
import { Routes, Route } from "react-router-dom";
import Taboo from "./components/Taboo/Taboo";
import TabooOptions from "./components/TabooOptions/TabooOptions";
import Translator from "./components/Translator/Translator";

const App = () => {
  return (
    <Routes>
      <Route path="/random-word" element={<Translator />} />
      <Route path="/" element={<TabooOptions />} />
      <Route path="/game" element={<Taboo />} />
    </Routes>
  );
};

export default App;
