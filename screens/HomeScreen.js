// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, ScrollView } from 'react-native';
// import { useHighScore } from '../context/HighScoreContext';

// const HomeScreen = ({ navigation }) => {
//   const { highScores } = useHighScore();
//   const [showHighScores, setShowHighScores] = useState(false);

//   const startGame = () => {
//     navigation.navigate('Game');
//   };

//   return (
//     <ImageBackground 
//       source={require('../assets/images/background.png')} 
//       style={styles.container}
//       imageStyle={{ resizeMode: 'cover' }}
//     >
//       <View style={styles.content}>
//         <Text style={styles.title}>Flappy Bird</Text>
        
//         <TouchableOpacity style={styles.startButton} onPress={startGame}>
//           <Text style={styles.startText}>Start Game</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.highScoreButton} onPress={() => setShowHighScores(true)}>
//           <Text style={styles.highScoreText}>High Scores</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal
//         visible={showHighScores}
//         transparent={true}
//         animationType="slide"
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Top 5 High Scores</Text>
//             <ScrollView style={styles.scoresList}>
//               {highScores.length > 0 ? (
//                 highScores.map((score, index) => (
//                   <View key={index} style={styles.scoreRow}>
//                     <Text style={styles.rank}>{index + 1}.</Text>
//                     <Text style={styles.playerName}>{score.name}</Text>
//                     <Text style={styles.scoreValue}>{score.score}</Text>
//                   </View>
//                 ))
//               ) : (
//                 <Text style={styles.noScores}>No high scores yet!</Text>
//               )}
//             </ScrollView>
//             <TouchableOpacity style={styles.closeButton} onPress={() => setShowHighScores(false)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center' },
//   content: { alignItems: 'center', padding: 20 },
//   title: { fontSize: 48, fontWeight: 'bold', color: '#fff', marginBottom: 40 },
//   startButton: { 
//     backgroundColor: '#4CAF50', 
//     paddingHorizontal: 40, 
//     paddingVertical: 18, 
//     borderRadius: 10,
//     marginBottom: 15,
//     minWidth: 200,
//     alignItems: 'center',
//   },
//   startText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
//   highScoreButton: {
//     backgroundColor: '#2196F3',
//     paddingHorizontal: 40,
//     paddingVertical: 18,
//     borderRadius: 10,
//     minWidth: 200,
//     alignItems: 'center',
//   },
//   highScoreText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.7)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 30,
//     width: '85%',
//     maxHeight: '70%',
//   },
//   modalTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   scoresList: {
//     marginBottom: 20,
//   },
//   scoreRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   rank: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     width: 40,
//   },
//   playerName: {
//     fontSize: 18,
//     color: '#333',
//     flex: 1,
//   },
//   scoreValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   noScores: {
//     fontSize: 18,
//     color: '#999',
//     textAlign: 'center',
//     paddingVertical: 30,
//   },
//   closeButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useHighScore } from '../context/HighScoreContext';
import { useSettings } from '../context/SettingsContext';

const HomeScreen = ({ navigation }) => {
  const { highScores } = useHighScore();
  const { settings, updateGameMode } = useSettings();
  const [showHighScores, setShowHighScores] = useState(false);

  const startGame = () => {
    navigation.navigate('Game');
  };

  return (
    <ImageBackground 
      source={require('../assets/images/background.png')} 
      style={styles.container}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Flappy Bird</Text>
        
        {/* Game Mode Selector */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Game Mode</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={settings.gameMode}
              onValueChange={(value) => updateGameMode(value)}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="Survival Mode" value="survival" />
              <Picker.Item label="Creative Mode" value="custom" />
            </Picker>
          </View>
        </View>
        {/* Game Mode Selector */}
{/* <View style={styles.modeContainer}>
  <Text style={styles.modeLabel}>Game Mode</Text>
  <View style={styles.modeButtons}>
    <TouchableOpacity 
      style={[
        styles.modeButton, 
        settings.gameMode === 'survival' && styles.modeButtonActive
      ]}
      onPress={() => updateGameMode('survival')}
    >
      <Text style={[
        styles.modeButtonText,
        settings.gameMode === 'survival' && styles.modeButtonTextActive
      ]}>
        Survival
      </Text>
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={[
        styles.modeButton, 
        settings.gameMode === 'custom' && styles.modeButtonActive
      ]}
      onPress={() => updateGameMode('custom')}
    >
      <Text style={[
        styles.modeButtonText,
        settings.gameMode === 'custom' && styles.modeButtonTextActive
      ]}>
        Custom
      </Text>
    </TouchableOpacity>
  </View>
</View> */}

        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startText}>Start Game</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.highScoreButton} onPress={() => setShowHighScores(true)}>
          <Text style={styles.highScoreText}>High Scores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsText}>⚙️ Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('About')}>
          <Text style={styles.aboutText}>ℹ️ About</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showHighScores}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Top 5 High Scores</Text>
            <ScrollView style={styles.scoresList}>
              {highScores.length > 0 ? (
                highScores.map((score, index) => (
                  <View key={index} style={styles.scoreRow}>
                    <Text style={styles.rank}>{index + 1}.</Text>
                    <Text style={styles.playerName}>{score.name}</Text>
                    <Text style={styles.scoreValue}>{score.score}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noScores}>No high scores yet!</Text>
              )}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowHighScores(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  content: { alignItems: 'center', padding: 20 },
  title: { fontSize: 48, fontWeight: 'bold', color: '#fff', marginBottom: 30 },
  pickerContainer: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  pickerWrapper: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    height: 50,
  },
  startButton: { 
    backgroundColor: '#4CAF50', 
    paddingHorizontal: 40, 
    paddingVertical: 18, 
    borderRadius: 10,
    marginBottom: 15,
    minWidth: 250,
    alignItems: 'center',
  },
  startText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  highScoreButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 10,
    minWidth: 250,
    alignItems: 'center',
    marginBottom: 15,
  },
  highScoreText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  settingsButton: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 10,
    minWidth: 250,
    alignItems: 'center',
  },
  settingsText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoresList: {
    marginBottom: 20,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    width: 40,
  },
  playerName: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  noScores: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 30,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  aboutButton: {
  backgroundColor: '#9C27B0',
  paddingHorizontal: 40,
  paddingVertical: 18,
  borderRadius: 10,
  minWidth: 250,
  alignItems: 'center',
  marginTop: 15,
},
aboutText: { 
  fontSize: 20, 
  color: '#fff', 
  fontWeight: 'bold' 
},
});

export default HomeScreen;