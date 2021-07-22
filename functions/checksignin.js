import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import Login from '../screens/login';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from '../navigation/navigation';
import firebase from 'firebase';
import 'firebase/auth';
import {firebaseConfig} from '../config/keys';

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class CheckSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotLoggedIn: null,
    };
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          this.setState({isNotLoggedIn: true});
        }
      }.bind(this),
    );
  };

  render() {
    if (this.state.isNotLoggedIn) {
      return (
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      );
    } else {
      return <Login />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
