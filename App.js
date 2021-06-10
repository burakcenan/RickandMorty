import React from 'react';
import {CharacterScreen, EpisodeScreen, HomeScreen} from './app/screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Episode"
          component={EpisodeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Character"
          component={CharacterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
