// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { useHighScore } from '../context/HighScoreContext'; // New import
// import Game from '../components/Game';

// const GameScreen = ({ navigation }) => {
//   const { saveHighScore } = useHighScore(); // Pull from context

//   return (
//     <View style={styles.container}>
//       <Game onGameOver={(score) => {
//         saveHighScore(score); // Save here
//         navigation.navigate('Home');
//       }} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
// });

// export default GameScreen;


// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { useHighScore } from '../context/HighScoreContext';
// import Game from '../components/Game';

// const GameScreen = ({ navigation }) => {
//   const { saveHighScore } = useHighScore();

//   return (
//     <View style={styles.container}>
//       <Game onGameOver={(score) => {
//         saveHighScore(score);
//         navigation.navigate('Home');
//       }} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
// });

// export default GameScreen;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Game from '../components/Game';

const GameScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Game navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default GameScreen;