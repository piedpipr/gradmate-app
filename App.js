import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './navigation/navigation';
import Splash from './screens/splash';
import Login from './screens/login';
import auth from '@react-native-firebase/auth';
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
      auth().onAuthStateChanged(user => {
        if (user) {
          AsyncStorage.setItem('currentUser', JSON.stringify(user), err => {
            if (err) {
              console.log('an error with user asynchstorage');
              throw err;
            }
            console.log('successfylly saved currentUser to local');
          }).catch(err => {
            console.log('error with user data saving is: ' + err);
          }); //SAVE THE USER TO ASYNCSTORAGE

          this.setState({isLoggedIn: true});
          console.log(user);
        }
      });
    }

    if (this.state.isAppLoaded && this.state.isLoggedIn) {
      return (
        <NavigationContainer>
          <StatusBar translucent backgroundColor="transparent" />
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
