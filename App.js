import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from './navigation/navigation';
import Splash from './screens/splash';
import CheckSignIn from './functions/checksignin';

import firebase from 'firebase';
import 'firebase/auth';
import { firebaseConfig } from './config/keys';

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isAppLoaded: null,
      isLoggedIn: null,
      
    }
  }

  render() {
    const valuePromise = AsyncStorage.getItem('isLoaded');
    valuePromise.then((value) => {
      if ( this.state.isAppLoaded == null ){
        if ( value != null ){
          this.setState({ isAppLoaded: value });
        }
      }
      
    });

      if(this.state.isAppLoaded && this.state.isLoggedIn) {
      return (
        <NavigationContainer><Tabs /></NavigationContainer>
      );
    } if(this.state.isAppLoaded ) {
      return (
        <CheckSignIn/>
      ); 
    } else {
      return (
        <Splash />
      );
    }
  } 
}
  

  





