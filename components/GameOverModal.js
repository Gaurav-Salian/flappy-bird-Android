import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ImageBackground } from 'react-native';

const GameOverModal = ({ 
  visible, 
  score, 
  showNameInput, 
  playerName, 
  onNameChange, 
  onSave, 
  onSkip, 
  onRestart, 
  onHome 
}) => {
  return (
    <>
      <ImageBackground 
        source={require('../assets/images/background.png')}  // Add your gameover background image here (e.g., cloudy sky or defeated bird scene)
        style={styles.gameOverContainer}
        resizeMode="cover"
        imageStyle={{ opacity: 0.8 }}  // Optional: Slight fade for better text readability
      >
        <Text style={styles.gameOverTitle}>Game Over</Text>
        <Text style={styles.finalScore}>Final Score: {score}</Text>
        <TouchableOpacity style={styles.button} onPress={onRestart}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onHome}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </ImageBackground>
      
      <Modal visible={showNameInput} transparent animationType="fade">
        <ImageBackground 
          source={require('../assets/images/background.png')}  // Reuse the same BG or swap for a high-score themed one
          style={styles.modalContainer}
          resizeMode="cover"
          imageStyle={{ opacity: 0.7 }}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New High Score!</Text>
            <Text style={styles.modalScore}>Score: {score}</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Enter your name"
              placeholderTextColor="#999"
              value={playerName}
              onChangeText={onNameChange}
              maxLength={15}
              autoFocus
            />
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  gameOverContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    // Removed backgroundColor since ImageBackground handles it
  },
  gameOverTitle: { 
    fontSize: 48, 
    fontWeight: 'bold', 
    color: '#fff',  // Changed to white for better contrast on BG image
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',  // Added shadow for readability
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  finalScore: { 
    fontSize: 28, 
    color: '#fff',  // Changed to white
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  button: { 
    backgroundColor: 'rgba(76, 175, 80, 0.9)',  // Semi-transparent for BG visibility
    paddingHorizontal: 40, 
    paddingVertical: 18, 
    borderRadius: 10, 
    margin: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: { 
    fontSize: 20, 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Removed backgroundColor since ImageBackground handles the overlay
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',  // Kept semi-transparent white for contrast
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  modalScore: {
    fontSize: 22,
    color: '#333',
    marginBottom: 20,
  },
  nameInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#fff',  // Ensure input is readable
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipText: {
    color: '#666',
    fontSize: 16,
  },
});

export default GameOverModal;