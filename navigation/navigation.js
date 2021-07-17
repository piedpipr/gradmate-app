import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import LoginScreen from '../screens/login'
import DashboardScreen from '../screens/dashboard'
import FlashcardScreen from '../screens/flashcard'
import TestScreen from '../screens/test'
import Test2Screen from '../screens/test2'

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
    <Tab.Navigator>
        <Tab.Screen name="Login" component={ LoginScreen }/>
        <Tab.Screen name="Test" component={ TestScreen }/>
        <Tab.Screen name="Flashcard" component={ FlashcardScreen }/>
        <Tab.Screen name="Test2" component={ Test2Screen }/>
        <Tab.Screen name="Dashboard" component={ DashboardScreen }/>
    </Tab.Navigator>
        );
    
    }

export default Tabs;
