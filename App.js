import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/navigation'
import Login from './screens/login'
import Dashboard from './screens/dashboard'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoaded: true,
      isAuthReady: true,
      isAuthenticated: false
    }
  }
  
  render() {
  if (this.state.isAuthenticated){
  return (
    <Login />
  );
} else {
  return (
    <NavigationContainer><Tabs /></NavigationContainer>
  );
}
  }
}
  





