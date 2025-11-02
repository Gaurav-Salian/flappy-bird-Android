import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ImageBackground,
  Linking 
} from 'react-native';

const AboutScreen = ({ navigation }) => {
  const openGitHub = () => {
    Linking.openURL('https://github.com/yourusername/flappy-bird-game');
  };

  return (
    <ImageBackground 
      source={require('../assets/images/background.png')} 
      style={styles.container}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          <Text style={styles.title}>About Flappy Bird</Text>

          {/* Developer Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👨‍💻 About the Developer</Text>
            <Text style={styles.text}>
              Hi! I'm Gaurav, a passionate game developer and student. 
              This Flappy Bird game is my personal project that I built from scratch 
              to learn mobile game development and create something fun for everyone to enjoy!
            </Text>
            <Text style={styles.text}>
              I love coding, gaming, and creating interactive experiences. 
              This project challenged me to learn React Native, game physics, 
              audio integration, and user customization features.
            </Text>
          </View>

          {/* Project Story */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎮 Project Story</Text>
            <Text style={styles.text}>
              I started this project with a simple goal: recreate the classic Flappy Bird 
              game with a twist. As development progressed, I realized players would love 
              more control over their gaming experience.
            </Text>
            <Text style={styles.text}>
              That's when I added the Creative Mode - giving YOU complete freedom to 
              customize every aspect of the game!
            </Text>
          </View>

          {/* Game Modes Explanation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Game Modes Explained</Text>
            
            <Text style={styles.subTitle}>Survival Mode</Text>
            <Text style={styles.text}>
              The classic Flappy Bird experience! Navigate through pipes and try to 
              beat your high score. As you score more points, the game gets progressively 
              harder with:
            </Text>
            <Text style={styles.bulletText}>• Faster pipe movement</Text>
            <Text style={styles.bulletText}>• Smaller gaps between pipes</Text>
            <Text style={styles.bulletText}>• More frequent pipe spawning</Text>
            <Text style={styles.bulletText}>• 6 difficulty tiers (unlocked at scores 11, 21, 31, 41, 51+)</Text>
            <Text style={styles.text}>
              Can you reach Tier 6? Challenge yourself and compete on the leaderboard!
            </Text>

            <Text style={styles.subTitle}>Creative Mode - Your Playground!</Text>
            <Text style={styles.text}>
              This is where the magic happens! Creative Mode gives you complete control 
              to make the game YOUR way. Want a giant slow bird? Easy peasy mode with 
              huge gaps? Or maybe an impossible challenge? You decide!
            </Text>
            
            <Text style={styles.highlightText}>🎨 What You Can Customize:</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>• Bird Size:</Text> Make your bird tiny (20px) or huge (50px)
            </Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>• Custom Bird Image:</Text> Upload ANY image from your phone! 
              Use your pet, favorite character, or a silly selfie
            </Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>• Pipe Width:</Text> Skinny pipes (50px) or thick obstacles (120px)
            </Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>• Pipe Gap:</Text> Super tight (150px) or relaxing wide (300px)
            </Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>• Game Speed:</Text> Slow motion (0.5x) to extreme speed (3x)
            </Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>• Gravity:</Text> Float like a feather (0.05) or drop like a rock (0.3)
            </Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>• Flap Power:</Text> Weak flaps (-3) to super jumps (-10)
            </Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>• Pipe Frequency:</Text> Rare (12 seconds) to constant (3 seconds)
            </Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>• Difficulty Progression:</Text> Keep it easy or enable scaling difficulty
            </Text>

            <Text style={styles.highlightText}>💡 Creative Mode Tips:</Text>
            <Text style={styles.bulletText}>
              • Want super easy mode? Set large bird, wide gaps, slow speed, and weak gravity
            </Text>
            <Text style={styles.bulletText}>
              • Want impossible mode? Set tiny bird, small gaps, fast speed, and strong gravity
            </Text>
            <Text style={styles.bulletText}>
              • Experiment! There are thousands of combinations to discover
            </Text>
            <Text style={styles.bulletText}>
              • Share your favorite settings with friends and challenge them
            </Text>
          </View>

          {/* Features Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>✨ Features</Text>
            <Text style={styles.bulletText}>• Two game modes: Survival & Creative</Text>
            <Text style={styles.bulletText}>• Top 5 high score leaderboard with player names</Text>
            <Text style={styles.bulletText}>• Smooth 60 FPS gameplay</Text>
            <Text style={styles.bulletText}>• Background music and sound effects</Text>
            <Text style={styles.bulletText}>• Adjustable audio volumes (SFX & Music)</Text>
            <Text style={styles.bulletText}>• Pause/Resume with countdown</Text>
            <Text style={styles.bulletText}>• Custom bird image upload (Creative Mode)</Text>
            <Text style={styles.bulletText}>• Complete game customization options</Text>
            <Text style={styles.bulletText}>• Persistent settings (saved even after closing app)</Text>
            <Text style={styles.bulletText}>• Haptic feedback support</Text>
          </View>

          {/* How to Play */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎮 How to Play</Text>
            <Text style={styles.bulletText}>• TAP anywhere on the screen to make the bird flap</Text>
            <Text style={styles.bulletText}>• Avoid hitting the pipes or the ground</Text>
            <Text style={styles.bulletText}>• Each pipe you pass = 1 point</Text>
            <Text style={styles.bulletText}>• Use the pause button (⏸) anytime during gameplay</Text>
            <Text style={styles.bulletText}>• Beat your high score and save your name!</Text>
          </View>

          {/* Technology */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚙️ Built With</Text>
            <Text style={styles.bulletText}>• React Native & Expo</Text>
            <Text style={styles.bulletText}>• Expo Audio for sound management</Text>
            <Text style={styles.bulletText}>• AsyncStorage for data persistence</Text>
            <Text style={styles.bulletText}>• Custom physics engine</Text>
            <Text style={styles.bulletText}>• Expo Image Picker for custom uploads</Text>
          </View>

          {/* Credits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🙏 Credits & Thanks</Text>
            <Text style={styles.text}>
              Inspired by the original Flappy Bird by Dong Nguyen. 
              This is a personal recreation project for educational purposes.
            </Text>
            <Text style={styles.text}>
              Special thanks to the React Native and Expo communities for their 
              amazing tools and documentation!
            </Text>
          </View>

          {/* Contact/GitHub */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📫 Get in Touch</Text>
            <Text style={styles.text}>
              Found a bug? Have a feature request? Want to contribute?
            </Text>
            <TouchableOpacity style={styles.githubButton} onPress={openGitHub}>
              <Text style={styles.githubButtonText}>🔗 View on GitHub</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>

          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  scrollView: { flex: 1 },
  content: { 
    padding: 20, 
    paddingBottom: 40 
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  section: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 12,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 15,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  highlightText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FF9800',
    marginTop: 12,
    marginBottom: 8,
  },
  githubButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  githubButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 15,
    fontStyle: 'italic',
  },
  backButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AboutScreen;