/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/navigation';
import Splash from './screens/splash';
import Login from './screens/login';
import firebase from 'firebase';
import 'firebase/auth';
import {firebaseConfig} from './config/keys';
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppLoaded: null,
      isLoggedIn: null,
    };
  }

  render() {
    const valuePromise = AsyncStorage.getItem('isLoaded');
    valuePromise.then(value => {
      if (this.state.isAppLoaded == null) {
        if (value != null) {
          this.setState({isAppLoaded: value});
        }
      }
    });

    if (this.state.isLoggedIn == null) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({isLoggedIn: true});
        }
      });
    }

    if (this.state.isAppLoaded && this.state.isLoggedIn) {
      return (
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      );
    }
    if (this.state.isAppLoaded) {
      return <Login />;
    } else {
      return <Splash />;
    }
  }
}
