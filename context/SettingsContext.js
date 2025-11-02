// import React, { createContext, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SettingsContext = createContext();

// export const useSettings = () => {
//   const context = useContext(SettingsContext);
//   if (!context) throw new Error('useSettings must be used within SettingsProvider');
//   return context;
// };

// const DEFAULT_SETTINGS = {
//   gameMode: 'survival', // 'survival' or 'custom'
//   customSettings: {
//     birdSize: 32,
//     pipeWidth: 80,
//     pipeGap: 200,
//     pipeSpeed: 1,
//     gravity: 0.1,
//     flapStrength: -5,
//     spawnInterval: 8000,
//     enableProgression: false, // Difficulty progression in custom mode
//   },
//   audio: {
//     sfxVolume: 1.0, // 0-1
//     musicVolume: 1.0, // 0-1
//   },
// };

// export const SettingsProvider = ({ children }) => {
//   const [settings, setSettings] = useState(DEFAULT_SETTINGS);

//   useEffect(() => {
//     loadSettings();
//   }, []);

//   const loadSettings = async () => {
//     try {
//       const saved = await AsyncStorage.getItem('flappySettings');
//       if (saved) {
//         setSettings(JSON.parse(saved));
//       }
//     } catch (e) {
//       console.error('Failed to load settings', e);
//     }
//   };

//   const saveSettings = async (newSettings) => {
//     try {
//       const updated = { ...settings, ...newSettings };
//       await AsyncStorage.setItem('flappySettings', JSON.stringify(updated));
//       setSettings(updated);
//     } catch (e) {
//       console.error('Failed to save settings', e);
//     }
//   };

//   const updateGameMode = (mode) => {
//     saveSettings({ gameMode: mode });
//   };

//   const updateCustomSettings = (customSettings) => {
//     saveSettings({ customSettings: { ...settings.customSettings, ...customSettings } });
//   };

//   const updateAudioSettings = (audio) => {
//     saveSettings({ audio: { ...settings.audio, ...audio } });
//   };

//   const resetToDefaults = () => {
//     saveSettings(DEFAULT_SETTINGS);
//   };

//   return (
//     <SettingsContext.Provider value={{ 
//       settings, 
//       updateGameMode, 
//       updateCustomSettings, 
//       updateAudioSettings,
//       resetToDefaults 
//     }}>
//       {children}
//     </SettingsContext.Provider>
//   );
// };




import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};

const DEFAULT_SETTINGS = {
  gameMode: 'survival', // 'survival' or 'custom'
  customSettings: {
    birdSize: 32,
    pipeWidth: 80,
    pipeGap: 200,
    pipeSpeed: 1,
    gravity: 0.1,
    flapStrength: -5,
    spawnInterval: 8000,
    enableProgression: false,
  },
  audio: {
    sfxVolume: 1.0,
    musicVolume: 1.0,
  },
  customBirdImage: null, // URI or base64 string for custom bird
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('flappySettings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      const updated = { ...settings, ...newSettings };
      await AsyncStorage.setItem('flappySettings', JSON.stringify(updated));
      setSettings(updated);
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  };

  const updateGameMode = (mode) => {
    saveSettings({ gameMode: mode });
  };

  const updateCustomSettings = (customSettings) => {
    saveSettings({ customSettings: { ...settings.customSettings, ...customSettings } });
  };

  const updateAudioSettings = (audio) => {
    saveSettings({ audio: { ...settings.audio, ...audio } });
  };

  const updateCustomBirdImage = (imageUri) => {
    saveSettings({ customBirdImage: imageUri });
  };

  const resetCustomBirdImage = () => {
    saveSettings({ customBirdImage: null });
  };

  const resetToDefaults = () => {
    saveSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      updateGameMode, 
      updateCustomSettings, 
      updateAudioSettings,
      updateCustomBirdImage,
      resetCustomBirdImage,
      resetToDefaults 
    }}>
      {children}
    </SettingsContext.Provider>
  );
};