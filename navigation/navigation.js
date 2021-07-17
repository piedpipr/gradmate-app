import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import LoginScreen from '../screens/login'
import DashboardScreen from '../screens/dashboard'
import FlashcardScreen from '../screens/flashcard'


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
    <Tab.Navigator>
        <Tab.Screen name="Login" component={ LoginScreen }/>
        <Tab.Screen name="Flashcard" component={ FlashcardScreen }/>
        <Tab.Screen name="Dashboard" component={ DashboardScreen }/>
    </Tab.Navigator>
        );
    
    }

export default Tabs;
