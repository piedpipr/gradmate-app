import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from './navigation/navigation';
import Splash from './screens/splash';



export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isAppLoaded: null
      
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

      if(this.state.isAppLoaded) {
      return (
        <NavigationContainer><Tabs /></NavigationContainer>
      );
    } else {
      return (
        <Splash />
      );
    }
  } 
}
  

  





