
import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Animated,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { useHighScore } from '../context/HighScoreContext';
import { useSettings } from '../context/SettingsContext';
import GameOverModal from './GameOverModal';
import PipeRenderer from './PipeRender';

const { width, height } = Dimensions.get('window');
const GAME_WIDTH = width;
const GAME_HEIGHT = height;



const getDifficultySettings = (score, baseSettings, enableProgression) => {
  if (!enableProgression) {
    return {
      tier: 1,
      pipeSpeed: baseSettings.pipeSpeed,
      pipeGap: baseSettings.pipeGap,
      spawnInterval: baseSettings.spawnInterval,
    };
  }

  let tier = 1;
  let speedMultiplier = 1;
  let gapReduction = 0;
  let spawnInterval = baseSettings.spawnInterval;
  
  if (score >= 51) {
    tier = 6;
    speedMultiplier = 1.5;
    gapReduction = 50;
    spawnInterval = 3000;
  } else if (score >= 41) {
    tier = 5;
    speedMultiplier = 1.4;
    gapReduction = 40;
    spawnInterval = 3500;
  } else if (score >= 31) {
    tier = 4;
    speedMultiplier = 1.3;
    gapReduction = 30;
    spawnInterval = 4000;
  } else if (score >= 21) {
    tier = 3;
    speedMultiplier = 1.2;
    gapReduction = 20;
    spawnInterval = 5000;
  } else if (score >= 11) {
    tier = 2;
    speedMultiplier = 1.1;
    gapReduction = 10;
    spawnInterval = 6000;
  }
  
  return {
    tier,
    pipeSpeed: baseSettings.pipeSpeed * speedMultiplier,
    pipeGap: Math.max(baseSettings.pipeGap - gapReduction, 100),
    spawnInterval,
  };
};

const Game = ({ navigation }) => {
  const { settings } = useSettings();
  // console.log(settings.audio)
  const gameMode = settings.gameMode;
  const customSettings = settings.customSettings;
  const audioSettings = settings.audio;

  // Use custom settings if in custom mode, otherwise use defaults
  const BASE_BIRD_SIZE = gameMode === 'custom' ? customSettings.birdSize : 32;
  const BASE_PIPE_WIDTH = gameMode === 'custom' ? customSettings.pipeWidth : 80;
  const BASE_PIPE_GAP = gameMode === 'custom' ? customSettings.pipeGap : 200;
  const BASE_PIPE_SPEED = gameMode === 'custom' ? customSettings.pipeSpeed : 1;
  const BASE_GRAVITY = gameMode === 'custom' ? customSettings.gravity : 0.1;
  const BASE_FLAP_STRENGTH = gameMode === 'custom' ? customSettings.flapStrength : -5;
  const BASE_SPAWN_INTERVAL = gameMode === 'custom' ? customSettings.spawnInterval : 8000;
  const ENABLE_PROGRESSION = gameMode === 'survival' || customSettings.enableProgression;

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [invincible, setInvincible] = useState(false);
  const [pipesState, setPipesState] = useState([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [difficulty, setDifficulty] = useState(
    getDifficultySettings(0, {
      pipeSpeed: BASE_PIPE_SPEED,
      pipeGap: BASE_PIPE_GAP,
      spawnInterval: BASE_SPAWN_INTERVAL,
    }, ENABLE_PROGRESSION)
  );

  const { saveHighScore, isHighScore } = useHighScore();

  const birdY = useRef(new Animated.Value(GAME_HEIGHT / 2 - BASE_BIRD_SIZE / 2)).current;
  const birdVel = useRef(0);
  const pipes = useRef([]);
  const gameLoop = useRef(null);
  const pipeSpawner = useRef(null);
  const lastFrameTime = useRef(Date.now());
  const frameCount = useRef(0);
  const scoreRef = useRef(score);

  useEffect(() => {
    scoreRef.current = score;
    setDifficulty(
      getDifficultySettings(score, {
        pipeSpeed: BASE_PIPE_SPEED,
        pipeGap: BASE_PIPE_GAP,
        spawnInterval: BASE_SPAWN_INTERVAL,
      }, ENABLE_PROGRESSION)
    );
  }, [score]);

  // Audio players
  const flapPlayer = useAudioPlayer(require('../assets/sounds/flap.mp3'));
  const scorePlayer = useAudioPlayer(require('../assets/sounds/score.mp3'));
  const hitPlayer = useAudioPlayer(require('../assets/sounds/hit.mp3'));
  const bgMusicPlayer = useAudioPlayer(require('../assets/sounds/background-music.mp3'));

// Set volumes whenever audio settings change
useEffect(() => {
  if (flapPlayer) flapPlayer.volume = audioSettings.sfxVolume;
  if (scorePlayer) scorePlayer.volume = audioSettings.sfxVolume;
  if (hitPlayer) hitPlayer.volume = audioSettings.sfxVolume;
  if (bgMusicPlayer) bgMusicPlayer.volume = audioSettings.musicVolume;
}, [audioSettings.sfxVolume, audioSettings.musicVolume, flapPlayer, scorePlayer, hitPlayer, bgMusicPlayer]);

// Background music control
useEffect(() => {
  if (bgMusicPlayer) {
    bgMusicPlayer.loop = true;
    
    if (gameStarted && !gameOver && !isPaused&& audioSettings.musicVolume > 0) {
      bgMusicPlayer.play();
    } else {
      bgMusicPlayer.pause();
    }
  }
  
  return () => {
    if (bgMusicPlayer) {
      bgMusicPlayer.pause();
    }
  };
}, [gameStarted, gameOver, isPaused, bgMusicPlayer, audioSettings.musicVolume]);


//   useEffect(() => {
//     if (gameStarted && !gameLoop.current && !isPaused) {
//       birdVel.current = BASE_FLAP_STRENGTH;
//       setInvincible(true);
//       setTimeout(() => setInvincible(false), 100);

//       lastFrameTime.current = Date.now();
//       gameLoop.current = requestAnimationFrame(updateGame);
      
//       generatePipe();
      
//       const spawnPipe = () => {
//         // console.log("pp "+isPaused)
//         if (gameStarted && !gameOver && !isPaused) {
//           generatePipe();
//           pipeSpawner.current = setTimeout(spawnPipe, difficulty.spawnInterval);
//         }
//       };
//       pipeSpawner.current = setTimeout(spawnPipe, difficulty.spawnInterval);
//     }
//     return () => {
//       if (gameLoop.current) {
//         cancelAnimationFrame(gameLoop.current);
//         gameLoop.current = null;
//       }
//       if (pipeSpawner.current) {
//         clearTimeout(pipeSpawner.current);
//         pipeSpawner.current = null;
//       }
//     };
//   }, [gameStarted, isPaused, difficulty.spawnInterval]);

// 1️⃣ Run once when the game starts
useEffect(() => {
  if (gameStarted) {
    birdVel.current = BASE_FLAP_STRENGTH;
    setInvincible(true);
    setTimeout(() => setInvincible(false), 100);

    lastFrameTime.current = Date.now();
    gameLoop.current = requestAnimationFrame(updateGame);
    
    // Generate the very first pipe only once
    generatePipe();
    
    const spawnPipe = () => {
      if (gameStarted && !gameOver && !isPaused) {
        generatePipe();
        pipeSpawner.current = setTimeout(spawnPipe, difficulty.spawnInterval);
      }
    };
    pipeSpawner.current = setTimeout(spawnPipe, difficulty.spawnInterval);
  }

  return () => {
    if (gameLoop.current) {
      cancelAnimationFrame(gameLoop.current);
      gameLoop.current = null;
    }
    if (pipeSpawner.current) {
      clearTimeout(pipeSpawner.current);
      pipeSpawner.current = null;
    }
  };
}, [gameStarted]); // 👈 only depend on gameStarted

// Pause / resume logic
useEffect(() => {
  if (isPaused) {
    // Stop everything
    if (gameLoop.current) {
      cancelAnimationFrame(gameLoop.current);
      gameLoop.current = null;
    }
    if (pipeSpawner.current) {
      clearTimeout(pipeSpawner.current);
      pipeSpawner.current = null;
    }
  } else if (gameStarted && !gameOver && !gameLoop.current) {
    // Resume game loop
    lastFrameTime.current = Date.now();
    gameLoop.current = requestAnimationFrame(updateGame);

    // 👇 Resume pipe spawning
    const spawnPipe = () => {
      if (gameStarted && !gameOver && !isPaused) {
        generatePipe();
        pipeSpawner.current = setTimeout(spawnPipe, difficulty.spawnInterval);
      }
    };

    pipeSpawner.current = setTimeout(spawnPipe, difficulty.spawnInterval);
  }
}, [isPaused]);

    // Get bird image based on mode and custom image
    const getBirdImageSource = () => {
    if (gameMode === 'custom' && settings.customBirdImage) {
        return { uri: settings.customBirdImage };
    }
    return require('../assets/images/bird.png');
    };

  const triggerHaptic = useCallback(async (type) => {
    if (Platform.OS === 'web') return;
    try {
      if (type === 'light') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else if (type === 'error') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (e) {}
  }, []);

  const playSound = useCallback((player, volumeMultiplier = 1) => {
  try {
    if (player && audioSettings.sfxVolume > 0) {
      player.seekTo(0);
      player.play();
    }
  } catch (error) {}
}, [audioSettings.sfxVolume]);

  const flap = useCallback(() => {
    if (gameOver || isPaused || countdown > 0) return;
    if (!gameStarted) {
      setGameStarted(true);
      return;
    }
    birdVel.current = BASE_FLAP_STRENGTH;
    if (audioSettings.sfxVolume > 0) {
      playSound(flapPlayer);
      // console.log("if " +flapPlayer.volume)
    }
    triggerHaptic('light');
  }, [gameOver, gameStarted, isPaused, countdown, flapPlayer, playSound, triggerHaptic, BASE_FLAP_STRENGTH]);

  const togglePause = useCallback(() => {
    if (gameOver || !gameStarted) return;
    
    if (isPaused) {
      // Unpause with countdown
      setCountdown(3);
      const countInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countInterval);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setIsPaused(true);
    }
  }, [isPaused, gameOver, gameStarted]);

  const updateGame = useCallback(() => {
    if (gameOver || !gameStarted || isPaused) return;

    const now = Date.now();
    const deltaTime = Math.min((now - lastFrameTime.current) / 16, 2);
    lastFrameTime.current = now;
    frameCount.current++;

    birdVel.current += BASE_GRAVITY * deltaTime;
    const newY = birdY._value + birdVel.current * deltaTime;
    birdY.setValue(newY);

    if (newY < 0 || newY > GAME_HEIGHT - BASE_BIRD_SIZE) {
      endGame();
      return;
    }
    pipes.current = pipes.current.filter(pipe => {
  pipe.x -= difficulty.pipeSpeed * deltaTime;
  
  if (!pipe.scored && pipe.x + BASE_PIPE_WIDTH < 50) {
    pipe.scored = true;
    setScore(s => s + 1);
    // In updateGame (score sound)
    if (audioSettings.sfxVolume > 0) {
      playSound(scorePlayer);
    }
  }
  
  return pipe.x + BASE_PIPE_WIDTH > -50;
});

if (frameCount.current % 2 === 0) {
  setPipesState([...pipes.current]);
}

if (!invincible) {
  const birdX = 50;
  const birdBottom = newY + BASE_BIRD_SIZE;
  
  for (let pipe of pipes.current) {
    if (
      pipe.x < birdX + BASE_BIRD_SIZE - 5 &&
      pipe.x + BASE_PIPE_WIDTH > birdX + 5 &&
      (newY < pipe.topHeight - 5 || birdBottom > pipe.topHeight + difficulty.pipeGap + 5)
    ) {
      endGame();
      return;
    }
  }
}

gameLoop.current = requestAnimationFrame(updateGame);
}, [gameOver, gameStarted, isPaused, invincible, birdY, playSound, scorePlayer, difficulty, BASE_GRAVITY, BASE_BIRD_SIZE, BASE_PIPE_WIDTH]);
const generatePipe = useCallback(() => {
if (!gameStarted || gameOver) return;
const minHeight = 100;
const maxHeight = GAME_HEIGHT - difficulty.pipeGap - 150;
const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
const newPipe = {
x: GAME_WIDTH,
topHeight,
scored: false,
id: Date.now() + Math.random()
};
pipes.current.push(newPipe);
setPipesState([...pipes.current]);
}, [gameStarted, gameOver, difficulty.pipeGap]);
const endGame = useCallback(() => {
if (gameOver) return;
setGameOver(true);
if (gameLoop.current) {
cancelAnimationFrame(gameLoop.current);
gameLoop.current = null;
}
if (pipeSpawner.current) {
clearTimeout(pipeSpawner.current);
pipeSpawner.current = null;
}
// In endGame
if (audioSettings.sfxVolume > 0) {
  playSound(hitPlayer);
}
triggerHaptic('error');
if (isHighScore(scoreRef.current)) {
  setShowNameInput(true);
}
}, [gameOver, hitPlayer, playSound, triggerHaptic, isHighScore]);
const restart = useCallback(() => {
setGameOver(false);
setGameStarted(false);
setScore(0);
setInvincible(false);
setIsPaused(false);
setCountdown(0);
birdY.setValue(GAME_HEIGHT / 2 - BASE_BIRD_SIZE / 2);
birdVel.current = 0;
pipes.current = [];
setPipesState([]);
frameCount.current = 0;
}, [birdY, BASE_BIRD_SIZE]);
const handleSaveScore = useCallback(async () => {
const name = playerName.trim() || 'Player';
await saveHighScore(scoreRef.current, name);
setShowNameInput(false);
setPlayerName('');
}, [playerName, saveHighScore]);
const handleSkipSave = useCallback(() => {
setShowNameInput(false);
setPlayerName('');
}, []);
if (gameOver) {
return (
<GameOverModal
visible={gameOver}
score={score}
showNameInput={showNameInput}
playerName={playerName}
onNameChange={setPlayerName}
onSave={handleSaveScore}
onSkip={handleSkipSave}
onRestart={restart}
onHome={() => navigation.navigate('Home')}
/>
);
}
return (
<TouchableOpacity style={styles.container} activeOpacity={1} onPress={flap}>
<ImageBackground
source={require('../assets/images/background.png')}
style={styles.background}
resizeMode="cover"
>
<PipeRenderer 
       pipesState={pipesState} 
       GAME_HEIGHT={GAME_HEIGHT} 
       PIPE_GAP={difficulty.pipeGap}
       PIPE_WIDTH={BASE_PIPE_WIDTH}
     />
     <Animated.View style={[styles.bird, { top: birdY, width: BASE_BIRD_SIZE, height: BASE_BIRD_SIZE, left: 50 }]}>
      {/* <Image 
        source={require('../assets/images/bird.png')} 
        style={{ width: BASE_BIRD_SIZE, height: BASE_BIRD_SIZE }}
        resizeMode="contain"
      /> */}
      <Image 
        source={getBirdImageSource()} 
        style={{ width: BASE_BIRD_SIZE, height: BASE_BIRD_SIZE }}
        resizeMode="contain"
        />
    </Animated.View>
    
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>{score}</Text>
      {ENABLE_PROGRESSION && difficulty.tier > 1 && (
        <Text style={styles.tierText}>Tier {difficulty.tier}</Text>
      )}
    </View>

    {/* Pause Button */}
    {gameStarted && !gameOver && (
      <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
        <Text style={styles.pauseText}>{isPaused ? '▶' : '⏸'}</Text>
      </TouchableOpacity>
    )}
    
    {!gameStarted && (
      <View style={styles.startOverlay}>
        <Text style={styles.startText}>Tap to Start!</Text>
        <Text style={styles.modeText}>Mode: {gameMode === 'survival' ? 'Survival' : 'Creative'}</Text>
      </View>
    )}

    {/* Pause Overlay */}
    {isPaused && (
      <View style={styles.pauseOverlay}>
        <Text style={styles.pausedText}>PAUSED</Text>
        <TouchableOpacity style={styles.resumeButton} onPress={togglePause}>
          <Text style={styles.buttonText}>Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    )}

    {/* Countdown Overlay */}
    {countdown > 0 && (
      <View style={styles.countdownOverlay}>
        <Text style={styles.countdownText}>{countdown}</Text>
      </View>
    )}
  </ImageBackground>
</TouchableOpacity>
);
};
const styles = StyleSheet.create({
container: { flex: 1 },
background: { flex: 1 },
bird: {
position: 'absolute',
justifyContent: 'center',
alignItems: 'center'
},
scoreContainer: {
position: 'absolute',
top: 60,
alignSelf: 'center',
backgroundColor: 'rgba(0,0,0,0.3)',
paddingHorizontal: 20,
paddingVertical: 10,
borderRadius: 10,
},
scoreText: {
fontSize: 42,
fontWeight: 'bold',
color: '#fff',
textShadowColor: 'rgba(0, 0, 0, 0.75)',
textShadowOffset: { width: -1, height: 1 },
textShadowRadius: 10,
textAlign: 'center',
},
tierText: {
fontSize: 18,
color: '#FFD700',
fontWeight: 'bold',
textAlign: 'center',
marginTop: 5,
},
pauseButton: {
position: 'absolute',
top: 60,
right: 20,
backgroundColor: 'rgba(0,0,0,0.5)',
width: 50,
height: 50,
borderRadius: 25,
justifyContent: 'center',
alignItems: 'center',
},
pauseText: {
fontSize: 24,
color: '#fff',
},
startOverlay: {
...StyleSheet.absoluteFillObject,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0,0,0,0.4)'
},
startText: {
fontSize: 28,
color: '#fff',
fontWeight: 'bold',
textShadowColor: 'rgba(0, 0, 0, 0.75)',
textShadowOffset: { width: -1, height: 1 },
textShadowRadius: 10
},
modeText: {
fontSize: 18,
color: '#FFD700',
fontWeight: 'bold',
marginTop: 10,
},
pauseOverlay: {
...StyleSheet.absoluteFillObject,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0,0,0,0.8)',
},
pausedText: {
fontSize: 48,
fontWeight: 'bold',
color: '#fff',
marginBottom: 40,
},
resumeButton: {
backgroundColor: '#4CAF50',
paddingHorizontal: 40,
paddingVertical: 18,
borderRadius: 10,
marginBottom: 15,
minWidth: 200,
alignItems: 'center',
},
homeButton: {
backgroundColor: '#FF5722',
paddingHorizontal: 40,
paddingVertical: 18,
borderRadius: 10,
minWidth: 200,
alignItems: 'center',
},
buttonText: {
fontSize: 20,
color: '#fff',
fontWeight: 'bold',
},
countdownOverlay: {
...StyleSheet.absoluteFillObject,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0,0,0,0.5)',
},
countdownText: {
fontSize: 120,
fontWeight: 'bold',
color: '#fff',
},
});
export default Game;