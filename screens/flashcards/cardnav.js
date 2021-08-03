import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CollectionScreen from './collection';
import FlashCardMenuScreen from './flashcards';
import ListScreen from './listpage';
import DetailsScreen from './details';
import FlashCardScreen from './flashcard';

const Stack = createStackNavigator();

function CardNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Flashcards" component={FlashCardMenuScreen} />
      <Stack.Screen name="Collection" component={CollectionScreen} />
      <Stack.Screen name="ListSets" component={ListScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Flashcard" component={FlashCardScreen} />
    </Stack.Navigator>
  );
}

export default CardNav;
