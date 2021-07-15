import React from 'react';
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
    <Dashboard />
  );
}
  }
}
  





