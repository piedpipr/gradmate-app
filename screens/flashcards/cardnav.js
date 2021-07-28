import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GreScreen from './grecards';
import IeltsScreen from './ieltscards';
import FlashCardMenuScreen from './flashcards';
import ListScreen from './listpage';
import FlashCardScreen from './flashcard';

const Stack = createStackNavigator();

function CardNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Flashcards" component={FlashCardMenuScreen} />
      <Stack.Screen name="GREFlashcards" component={GreScreen} />
      <Stack.Screen name="IELTSFlashcards" component={IeltsScreen} />
      <Stack.Screen name="ListSets" component={ListScreen} />
      <Stack.Screen name="Flashcard" component={FlashCardScreen} />
    </Stack.Navigator>
  );
}

export default CardNav;
