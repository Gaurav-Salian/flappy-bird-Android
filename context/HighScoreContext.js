// // import React, { createContext, useState, useContext, useEffect } from 'react';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {
// //   View,
// //   Animated,
// //   PanResponder,
// //   Dimensions,
// //   Image,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Platform,
// //   ImageBackground
// // } from 'react-native';
// // const HighScoreContext = createContext();

// // export const useHighScore = () => {
// //   const context = useContext(HighScoreContext);
// //   if (!context) throw new Error('useHighScore must be used within HighScoreProvider');
// //   return context;
// // };

// // export const HighScoreProvider = ({ children }) => {
// //   const [highScore, setHighScore] = useState(0);

// //   useEffect(() => {
// //     loadHighScore();
// //   }, []);

// //   const loadHighScore = async () => {
// //     try {
// //       const saved = await AsyncStorage.getItem('flappyHighScore');
// //       if (saved) setHighScore(JSON.parse(saved));
// //     } catch (e) {
// //       console.error('Failed to load high score', e);
// //     }
// //   };

// //   const saveHighScore = async (score) => {
// //     if (score > highScore) {
// //       await AsyncStorage.setItem('flappyHighScore', JSON.stringify(score));
// //       setHighScore(score);
// //     }
// //   };

// //   return (
// //     <HighScoreContext.Provider value={{ highScore, saveHighScore }}>
// //       {children}
// //     </HighScoreContext.Provider>
// //   );
// // };

// import React, { createContext, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const HighScoreContext = createContext();

// export const useHighScore = () => {
//   const context = useContext(HighScoreContext);
//   if (!context) throw new Error('useHighScore must be used within HighScoreProvider');
//   return context;
// };

// export const HighScoreProvider = ({ children }) => {
//   const [highScore, setHighScore] = useState(0);

//   useEffect(() => {
//     loadHighScore();
//   }, []);

//   const loadHighScore = async () => {
//     try {
//       const saved = await AsyncStorage.getItem('flappyHighScore');
//       if (saved) setHighScore(JSON.parse(saved));
//     } catch (e) {
//       console.error('Failed to load high score', e);
//     }
//   };

//   const saveHighScore = async (score) => {
//     if (score > highScore) {
//       await AsyncStorage.setItem('flappyHighScore', JSON.stringify(score));
//       setHighScore(score);
//     }
//   };

//   return (
//     <HighScoreContext.Provider value={{ highScore, saveHighScore }}>
//       {children}
//     </HighScoreContext.Provider>
//   );
// };



import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HighScoreContext = createContext();

export const useHighScore = () => {
  const context = useContext(HighScoreContext);
  if (!context) throw new Error('useHighScore must be used within HighScoreProvider');
  return context;
};

export const HighScoreProvider = ({ children }) => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    loadHighScores();
  }, []);

  const loadHighScores = async () => {
    try {
      const saved = await AsyncStorage.getItem('flappyHighScores');
      if (saved) {
        setHighScores(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load high scores', e);
    }
  };

  // const saveHighScore = async (score, name) => {
  //   try {
  //     const newScore = { name, score, date: new Date().toISOString() };
  //     const updatedScores = [...highScores, newScore]
  //       .sort((a, b) => b.score - a.score)
  //       .slice(0, 5); // Keep top 5
      
  //     await AsyncStorage.setItem('flappyHighScores', JSON.stringify(updatedScores));
  //     setHighScores(updatedScores);
  //     return true;
  //   } catch (e) {
  //     console.error('Failed to save high score', e);
  //     return false;
  //   }
  // };

//   const saveHighScore = async (score, name) => {
//   try {
//     const newEntry = { 
//       name: name || 'Anonymous', 
//       score, 
//       date: new Date().toISOString() 
//     };
    
//     setHighScores(prevScores => {
//       let updatedScores;
      
//       if (prevScores.length === 0) {
//         // Empty: Just add
//         updatedScores = [newEntry];
//       } else if (score > prevScores[0].score) {
//         // Higher: Add and sort/trim
//         updatedScores = [...prevScores, newEntry]
//           .sort((a, b) => b.score - a.score)
//           .slice(0, 5);
//       } else if (score === prevScores[0].score) {
//         // Tie: Pop the top (old highest), push new (replaces for tie)
//         updatedScores = [...prevScores.slice(1), newEntry]
//           .sort((a, b) => b.score - a.score)
//           .slice(0, 5);
//       } else {
//         // Not high: Do nothing (since popup only for high)
//         return prevScores;
//       }
      
//       // Persist to AsyncStorage
//       AsyncStorage.setItem('flappyHighScores', JSON.stringify(updatedScores));
//       return updatedScores;
//     });
    
//     return true;
//   } catch (e) {
//     console.error('Failed to save high score', e);
//     return false;
//   }
// };


const saveHighScore = async (score, name) => {
  try {
    const newEntry = { 
      name: name || 'Anonymous', 
      score, 
      date: new Date().toISOString() 
    };
    
    console.log('Saving High Score:', newEntry); // Debug: Log new entry
    console.log('Current High Scores Before Save:', highScores); // Debug
    
    setHighScores(prevScores => {
      let updatedScores;
      
      // If empty or score >= lowest (qualifies for top 5)
      if (prevScores.length === 0 || score >= (prevScores[prevScores.length - 1]?.score || 0)) {
        // Add new, sort descending by score (then by date descending for tiebreakers)
        updatedScores = [...prevScores, newEntry]
          .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score; // Primary: score desc
            return new Date(b.date) - new Date(a.date); // Secondary: newer date first for ties
          })
          .slice(0, 5); // Trim to top 5 (deletes least if full)
      } else {
        // Shouldn't reach here (popup only for qualifying scores), but no-op
        console.log('Score does not qualify for top 5 - skipping save');
        return prevScores;
      }
      
      // console.log('Updated High Scores After Save:', updatedScores); // Debug
      
      // Persist to AsyncStorage
      AsyncStorage.setItem('flappyHighScores', JSON.stringify(updatedScores));
      return updatedScores;
    });
    
    return true;
  } catch (e) {
    console.error('Failed to save high score', e);
    return false;
  }
};

// const isHighScore = (score) => {
//   return highScores.length === 0 || score >= highScores[0].score;
// };


  // const isHighScore = (score) => {
  //   if (highScores.length < 5) return true;
  //   return score > highScores[highScores.length - 1].score;
  // };
  const isHighScore = (score) => {
    // console.log("hi sco  " + highScores[0].score + " hh  " + score)
  return highScores.length === 0 || score >= highScores[0].score;
};

  return (
    <HighScoreContext.Provider value={{ highScores, saveHighScore, isHighScore }}>
      {children}
    </HighScoreContext.Provider>
  );
};