// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { HighScoreProvider } from './context/HighScoreContext';
// import HomeScreen from './screens/HomeScreen';
// import GameScreen from './screens/GameScreen';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <HighScoreProvider>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="Game" component={GameScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </HighScoreProvider>
//   );
// }


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HighScoreProvider } from './context/HighScoreContext';
import { SettingsProvider } from './context/SettingsContext';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SettingsProvider>
      <HighScoreProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </HighScoreProvider>
    </SettingsProvider>
  );
}