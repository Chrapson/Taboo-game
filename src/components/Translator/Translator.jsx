import React, { useState, useEffect } from "react";
import axios from "axios";

const Translator = () => {
  const [randomWord, setRandomWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [englishWords, setEnglishWords] = useState([]);

  useEffect(() => {
    fetchRandomWords();
  }, []);

  const fetchRandomWords = async () => {
    try {
      const response = await axios.get(
        "https://random-word-api.herokuapp.com/all"
      );
      setEnglishWords(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const generateRandomWord = () => {
    if (englishWords.length === 0) {
      console.error("Data not available.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * englishWords.length);
    const randomEnglishWord = englishWords[randomIndex];
    setRandomWord(randomEnglishWord);

    translateWord(randomEnglishWord);
  };

  const translateWord = async (word) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("from", "en");
    encodedParams.set("to", "pl");
    encodedParams.set("text", word);

    const API_KEY = process.env.REACT_APP_TRANSLATOR_API_KEY;

    const options = {
      method: "POST",
      url: "https://aibit-translator.p.rapidapi.com/api/v1/translator/text",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "aibit-translator.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const translatedText = response.data.trans;
      setTranslation(translatedText);
      console.log(process.env.REACT_APP_TRANSLATOR_API_KEY);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={generateRandomWord} style={styles.button}>
        Wygeneruj losowe słowo
      </button>
      <div style={styles.word}>
        <strong>Losowe słowo (angielski):</strong> {randomWord}
      </div>
      <div style={styles.translation}>
        <strong>Tłumaczenie (polski):</strong> {translation}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  button: {
    fontSize: "1.5em",
    padding: "10px 20px",
    cursor: "pointer",
  },
  word: {
    marginTop: "20px",
    fontSize: "2em",
  },
  translation: {
    marginTop: "10px",
    fontSize: "2em",
  },
};

export default Translator;
