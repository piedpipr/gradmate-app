import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import LoginScreen from '../screens/login'
import DashboardScreen from '../screens/dashboard'
import FlashcardScreen from '../screens/flashcard'
import QuizScreen from '../screens/quiz'


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
    <Tab.Navigator>
        <Tab.Screen name="Flaschcard" component={ LoginScreen }/>
        <Tab.Screen name="Dashboard" component={ DashboardScreen }/>
        <Tab.Screen name="Quiz" component={ DashboardScreen }/>
    </Tab.Navigator>
        );
    
    }

export default Tabs;
