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
import firestore from '@react-native-firebase/firestore';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppLoaded: null,
      isLoggedIn: null,
      isUserData: null,
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
          ///////////////////////////////////////////////////////////////////////////
          AsyncStorage.setItem('currentUser', JSON.stringify(user), err => {
            if (err) {
              console.log('an error with user asynchstorage');
              throw err;
            }
            console.log('successfylly saved currentUser to local');
          }).catch(err => {
            console.log('error with user data saving is: ' + err);
          }); //SAVE THE AUTH USER OBJECT TO ASYNCSTORAGE
          AsyncStorage.setItem('currentUserID', user.uid); //SAVES ONLY THE USER ID TO ASYNCSTORAGE

          ////////////////////////////////////////////////////////////////////////////////////////////
          let userData = async () => {
            const events = await firestore()
              .collection('UsersCOLLECTION') //CHANGE TO ORIGINSL USER COLLECTION
              .doc(user.uid);
            events
              .get()
              .then(data => {
                if (data.exists) {
                  console.log('User alredy exists');
                  console.log(data);
                  this.setState({isLoggedIn: true});
                } else {
                  if (user.isAnonymous === false) {
                    let AddUserDB = () => {
                      firestore()
                        .collection('UsersCOLLECTION') //CHANGE TO ORIGINSL USER COLLECTION
                        .doc(user.uid)
                        .set({
                          name: user.displayName,
                          email: user.email,
                          learned: 'YOUR SETS',
                          learning: 'YOUR SETS',
                        })
                        .then(() => {
                          console.log('User added! to Firestore');
                          this.setState({isLoggedIn: true});
                        });
                    };
                    AddUserDB();
                  } else {
                    console.log('User is Anonymous');
                    this.setState({isLoggedIn: true});
                  }
                }
              })
              .catch(error => {
                console.log(error);
                console.log('Error Showed');
              }); //CHECKS IF THE LOGGED IN USER ALREADY EXISTIS IN USER COLLECTION, IF EXISTS RENDER APP OTHERWISE ADD USER DATA TO DB, WITH AUTH UID AS DOC ID
          };
          userData();
          /////////////////////////
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
