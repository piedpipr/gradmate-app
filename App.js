import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from './navigation/navigation';
import Login from './screens/login';
import Dashboard from './screens/dashboard';
import Splash from './screens/splash';



export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isAppLoaded: false,
      
    }
  }

  render() {
        const value = AsyncStorage.getItem('isAppLoaded')
        if(value !== "yes") {
          return (
            <Splash />
          );
        } else {
          return (
            <NavigationContainer><Tabs /></NavigationContainer>
          );
        }
  } 
}
  

  





