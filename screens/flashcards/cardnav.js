import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GreScreen from './grecards';
import IeltsScreen from './ieltscards';
import FlashCardMenuScreen from './flashcards';
import FlashCardScreen from './flashcards';

const Stack = createStackNavigator();

function CardNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Flashcards" component={FlashCardMenuScreen} />
      <Stack.Screen name="GREFlashcards" component={GreScreen} />
      <Stack.Screen name="IELTSFlashcards" component={IeltsScreen} />
      <Stack.Screen name="Flashcard" component={FlashCardScreen} />
    </Stack.Navigator>
  );
}

export default CardNav;
