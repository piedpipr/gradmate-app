import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/login';
import DashboardScreen from '../screens/dashboard';
import Test1Screen from '../screens/test1';
import FlashcardNavScreen from '../screens/flashcards/cardnav';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'relative',
          height: '7%',
          bottom: 0,
          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen
        name="DBAdd"
        component={Test1Screen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/dashboard.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 20,
                  tintColor: focused ? '#3395ff' : '#66b0ff',
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? '#3395ff' : '#66b0ff',
                }}>
                DBAdd
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/dashboard.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 20,
                  tintColor: focused ? '#3395ff' : '#66b0ff',
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? '#3395ff' : '#66b0ff',
                }}>
                Dashboard
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="FlashscardNav"
        component={FlashcardNavScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/card.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 20,
                  tintColor: focused ? '#3395ff' : '#66b0ff',
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? '#3395ff' : '#66b0ff',
                }}>
                FlashcardNav
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={LoginScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/quiz.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 20,
                  tintColor: focused ? '#3395ff' : '#66b0ff',
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: focused ? '#3395ff' : '#66b0ff',
                }}>
                Quiz
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'red',
    shadowOffset: {
      height: 20,
      width: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 22,
    elevation: 5,
  },
});

export default Tabs;
