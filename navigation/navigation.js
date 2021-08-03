import React from 'react';
import {Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/dashboard';
import Test1Screen from '../screens/test1';
import FlashcardNavScreen from '../screens/flashcards/cardnav';
import AboutScreen from '../screens/about';

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
      {/* <Tab.Screen
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
      /> */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          unmountOnBlur: true,
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
        listeners={({navigation, route}) => ({
          tabPress: e => {
            navigation.navigate('FlashscardNav', {
              screen: 'Flashcards',
            });
          },
        })}
        options={{
          unmountOnBlur: false,
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
                Flashcards
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
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
                About Us
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
