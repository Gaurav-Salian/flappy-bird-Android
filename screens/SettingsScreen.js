import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  ImageBackground,
  Image
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useSettings } from '../context/SettingsContext';
import * as ImagePicker from 'expo-image-picker';

const SettingsScreen = ({ navigation }) => {
  // const { settings, updateCustomSettings, updateAudioSettings, resetToDefaults } = useSettings();
  const { settings, updateCustomSettings, updateAudioSettings, updateCustomBirdImage, resetCustomBirdImage, resetToDefaults } = useSettings();
  const [customSettings, setCustomSettings] = useState(settings.customSettings);
  const [audioSettings, setAudioSettings] = useState(settings.audio);
  const [customBirdImage, setCustomBirdImage] = useState(settings.customBirdImage);

  const pickBirdImage = async () => {
  try {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload a custom bird image!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square crop
      quality: 0.8,
      base64: false,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      
      // Check file size (max 2MB)
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const sizeInMB = blob.size / (1024 * 1024);
      
      if (sizeInMB > 2) {
        alert('Image too large! Please select an image under 2MB.');
        return;
      }
      
      setCustomBirdImage(imageUri);
      updateCustomBirdImage(imageUri);
    }
  } catch (error) {
    console.error('Error picking image:', error);
    alert('Failed to pick image. Please try again.');
  }
};

const resetBirdImage = () => {
  setCustomBirdImage(null);
  resetCustomBirdImage();
};

  const handleCustomChange = (key, value) => {
    const updated = { ...customSettings, [key]: value };
    setCustomSettings(updated);
    updateCustomSettings(updated);
  };

  const handleAudioChange = (key, value) => {
    const updated = { ...audioSettings, [key]: value };
    setAudioSettings(updated);
    updateAudioSettings(updated);
  };

  const handleReset = () => {
    resetToDefaults();
    setCustomSettings({
      birdSize: 32,
      pipeWidth: 80,
      pipeGap: 200,
      pipeSpeed: 1,
      gravity: 0.1,
      flapStrength: -5,
      spawnInterval: 8000,
      enableProgression: false,
    });
    setAudioSettings({
      sfxVolume: 1.0,
      musicVolume: 1.0,
    });
  };

  return (
    <ImageBackground 
      source={require('../assets/images/background.png')} 
      style={styles.container}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.overlay}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Settings</Text>

          {/* Custom Game Mode Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Creative Game Mode Settings</Text>
            
            <View style={styles.settingRow}>
              <Text style={styles.label}>Bird Size: {customSettings.birdSize}</Text>
              <Slider
                style={styles.slider}
                minimumValue={10}
                maximumValue={300}
                step={1}
                value={customSettings.birdSize}
                onValueChange={(val) => handleCustomChange('birdSize', val)}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ddd"
              />
            </View>

            {/* <View style={styles.settingRow}>
              <Text style={styles.label}>Pipe Width: {customSettings.pipeWidth}</Text>
              <Slider
                style={styles.slider}
                minimumValue={50}
                maximumValue={120}
                step={1}
                value={customSettings.pipeWidth}
                onValueChange={(val) => handleCustomChange('pipeWidth', val)}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ddd"
              />
            </View> */}

            <View style={styles.settingRow}>
              <Text style={styles.label}>Pipe Gap: {customSettings.pipeGap}</Text>
              <Slider
                style={styles.slider}
                minimumValue={50}
                maximumValue={700}
                step={10}
                value={customSettings.pipeGap}
                onValueChange={(val) => handleCustomChange('pipeGap', val)}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ddd"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.label}>Pipe Speed: {customSettings.pipeSpeed.toFixed(1)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.5}
                maximumValue={3}
                step={0.1}
                value={customSettings.pipeSpeed}
                onValueChange={(val) => handleCustomChange('pipeSpeed', val)}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ddd"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.label}>Gravity: {customSettings.gravity.toFixed(2)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0.05}
                maximumValue={0.5}
                step={0.01}
                value={customSettings.gravity}
                onValueChange={(val) => handleCustomChange('gravity', val)}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ddd"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.label}>Flap Strength: {customSettings.flapStrength.toFixed(1)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={-20}
                maximumValue={-3}
                step={0.5}
                value={customSettings.flapStrength}
                onValueChange={(val) => handleCustomChange('flapStrength', val)}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ddd"
              />
            </View>

            {/* <View style={styles.settingRow}>
              <Text style={styles.label}>Spawn Interval: {customSettings.spawnInterval}ms</Text>
              <Slider
                style={styles.slider}
                minimumValue={3000}
                maximumValue={12000}
                step={500}
                value={customSettings.spawnInterval}
                onValueChange={(val) => handleCustomChange('spawnInterval', val)}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ddd"
              />
            </View>
             */}
             <View style={styles.settingRow}>
                <Text style={styles.label}>
                    Spawn Interval: {customSettings.spawnInterval / 1000}s
                </Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1}       // 3 seconds
                    maximumValue={12}      // 12 seconds
                    step={0.5}             // half-second steps
                    value={customSettings.spawnInterval / 1000} // convert ms → s for display
                    onValueChange={(val) => handleCustomChange('spawnInterval', val * 1000)} // convert s → ms for storage
                    minimumTrackTintColor="#4CAF50"
                    maximumTrackTintColor="#ddd"
                />
             </View>


            <View style={styles.toggleRow}>
              <Text style={styles.label}>Enable Difficulty Progression</Text>
              <Switch
                value={customSettings.enableProgression}
                onValueChange={(val) => handleCustomChange('enableProgression', val)}
                trackColor={{ false: '#767577', true: '#4CAF50' }}
                thumbColor={customSettings.enableProgression ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Bird Customization */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bird Customization (Creative Mode Only)</Text>
            
            <View style={styles.birdPreviewContainer}>
              <Text style={styles.label}>Current Bird:</Text>
              <View style={styles.birdPreview}>
                <Image
                  source={customBirdImage ? { uri: customBirdImage } : require('../assets/images/bird.png')}
                  style={styles.birdPreviewImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.uploadButton} onPress={pickBirdImage}>
              <Text style={styles.buttonText}>📷 Upload Custom Bird</Text>
            </TouchableOpacity>

            {customBirdImage && (
              <TouchableOpacity style={styles.resetBirdButton} onPress={resetBirdImage}>
                <Text style={styles.buttonText}>Reset to Default Bird</Text>
              </TouchableOpacity>
            )}
            
            <Text style={styles.infoText}>
              • Max 2MB, square images work best{'\n'}
              • Custom bird only appears in Custom Mode
            </Text>
          </View>

          {/* Audio Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Audio Settings</Text>
            
            <View style={styles.settingRow}>
              <Text style={styles.label}>SFX Volume: {Math.round(audioSettings.sfxVolume * 100)}%</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                value={audioSettings.sfxVolume}
                onValueChange={(val) => handleAudioChange('sfxVolume', val)}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ddd"
              />
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.label}>Music Volume: {Math.round(audioSettings.musicVolume * 100)}%</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                value={audioSettings.musicVolume}
                onValueChange={(val) => handleAudioChange('musicVolume', val)}
                minimumTrackTintColor="#4CAF50"
                maximumTrackTintColor="#ddd"
              />
            </View>
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset to Default</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Back to Home</Text>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  scrollView: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  section: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  settingRow: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  birdPreviewContainer: {
  alignItems: 'center',
  marginBottom: 15,
},
birdPreview: {
  width: 100,
  height: 100,
  backgroundColor: '#f0f0f0',
  borderRadius: 10,
  borderWidth: 2,
  borderColor: '#4CAF50',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
},
birdPreviewImage: {
  width: 80,
  height: 80,
},
uploadButton: {
  backgroundColor: '#2196F3',
  paddingVertical: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 10,
},
resetBirdButton: {
  backgroundColor: '#FF9800',
  paddingVertical: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 10,
},
infoText: {
  fontSize: 13,
  color: '#666',
  marginTop: 10,
  lineHeight: 20,
},
});

export default SettingsScreen;