import React from "react";
import { Routes, Route } from "react-router-dom";
import Taboo from "./components/Taboo/Taboo";
import TabooOptions from "./components/TabooOptions/TabooOptions";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TabooOptions />} />
        <Route path="/game" element={<Taboo />} />
      </Routes>
    </>
  );
};

export default App;
