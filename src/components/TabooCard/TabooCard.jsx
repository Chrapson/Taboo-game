// import { useEffect } from "react";
// import React, { useEffect } from "react";
// import styles from "./TabooCard.module.css";
// import { useState } from "react";
// import axios from "axios";

// const TabooCard = React.memo(({ language, getRandomColor }) => {
//   const [forbiddenWords, setForbiddenWords] = useState([]);
//   const [wordToGuess, setWordToGuess] = useState("");
//   const [difficulty, setDifficulty] = useState("");
//   const [containerBackgroundColor, setContainerBackgroundColor] = useState(
//     getRandomColor()
//   );

//   const getWords = async () => {
//     try {
//       const response = await axios.get(
//         `https://www.taboocardsapi.com/api/cards/random?language=${language}`
//       );
//       console.log(response);
//       setForbiddenWords(response.data.data.forbiddenWords);
//       setWordToGuess(response.data.data.title);
//       setDifficulty(response.data.data.difficulty);
//       setContainerBackgroundColor(getRandomColor());
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getWords();
//   }, [language]);
//   return (
//     <div
//       className={`${styles.container} ${styles.customContainer}`}
//       style={{ backgroundColor: containerBackgroundColor }}
//     >
//       <div className={styles.wordToGuessContainer}>{wordToGuess}</div>
//       <div className={styles.forbiddenWordsContainer}>
//         {forbiddenWords.map((word, index) => (
//           <div key={index}>{word}</div>
//         ))}
//       </div>
//       <div className={styles.difficultyContainer}>{difficulty}</div>
//     </div>
//   );
// });

// export default TabooCard;
